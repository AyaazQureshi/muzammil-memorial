const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const mongoose = require('mongoose');

process.env.ADMIN_SECRET = 'test-secret-123456';
process.env.NODE_ENV = 'test';

const createApp = require('../app');
const Campaign = require('../models/Campaign');

let server, base;
let store = null; // fake in-memory "database" document

test.before(async () => {
  // Stub the model so the controller logic can be exercised without a MongoDB server.
  Campaign.findOne = () => ({ lean: async () => store });
  Campaign.findOneAndUpdate = (q, update) => ({
    lean: async () => {
      store = { ...(store || { key: 'main', updates: [] }), ...update.$set };
      return store;
    },
  });
  server = http.createServer(createApp());
  await new Promise((r) => server.listen(0, r));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const call = (path, opts = {}) =>
  fetch(base + path, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
const put = (body, secret = process.env.ADMIN_SECRET) =>
  call('/api/campaign', { method: 'PUT', headers: { 'x-admin-secret': secret }, body: JSON.stringify(body) });

test('health endpoint', async () => {
  assert.strictEqual((await call('/api/health')).status, 200);
});

test('GET /api/campaign returns empty defaults when the database is not connected', async () => {
  const res = await call('/api/campaign');
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.targetAmount, null);
  assert.strictEqual(body.collectedAmount, null);
  assert.strictEqual(body.status, 'active');
});

test('PUT without a secret is rejected', async () => {
  assert.strictEqual((await call('/api/campaign', { method: 'PUT', body: '{}' })).status, 401);
});

test('PUT with the wrong secret is rejected', async () => {
  assert.strictEqual((await put({ targetAmount: 1 }, 'wrong-secret-000000')).status, 401);
});

test('PUT is refused (503) while the database is down, even with the right secret', async () => {
  assert.strictEqual((await put({ targetAmount: 1000 })).status, 503);
});

test('with a connected database: validation, update and read-back', async () => {
  mongoose.connection._readyState = 1; // pretend connected
  try {
    for (const bad of [{ targetAmount: -5 }, { collectedAmount: 'abc' }, { status: 'hacked' }, { targetAmount: { $gt: 0 } }, {}, { updates: [{ message: '' }] }]) {
      const r = await put(bad);
      assert.strictEqual(r.status, 400, JSON.stringify(bad));
    }
    const ok = await put({ targetAmount: 100000, collectedAmount: 25000, updates: [{ message: ' Thank you ' }] });
    assert.strictEqual(ok.status, 200);
    const pub = await (await call('/api/campaign')).json();
    assert.strictEqual(pub.targetAmount, 100000);
    assert.strictEqual(pub.collectedAmount, 25000);
    assert.strictEqual(pub.updates[0].message, 'Thank you');
    assert.ok(pub.lastUpdated);
    // clearing a figure hides the progress bar again
    await put({ targetAmount: null });
    assert.strictEqual((await (await call('/api/campaign')).json()).targetAmount, null);
  } finally {
    mongoose.connection._readyState = 0;
  }
});

test('verify endpoint checks the secret', async () => {
  assert.strictEqual((await call('/api/campaign/verify', { headers: { 'x-admin-secret': process.env.ADMIN_SECRET } })).status, 200);
  assert.strictEqual((await call('/api/campaign/verify', { headers: { 'x-admin-secret': 'nope' } })).status, 401);
});

test('malformed JSON gives a 400, unknown API route gives a 404', async () => {
  const r = await call('/api/campaign', { method: 'PUT', headers: { 'x-admin-secret': process.env.ADMIN_SECRET }, body: '{bad' });
  assert.strictEqual(r.status, 400);
  assert.strictEqual((await call('/api/nope')).status, 404);
});
