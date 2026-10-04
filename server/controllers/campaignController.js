const Campaign = require('../models/Campaign');
const { isDbReady } = require('../config/db');
const { validateCampaignUpdate } = require('../utils/validateCampaign');

const EMPTY = { targetAmount: null, collectedAmount: null, status: 'active', updates: [], lastUpdated: null };

const serialize = (doc) => {
  const d = doc || EMPTY;
  return {
    targetAmount: d.targetAmount ?? null,
    collectedAmount: d.collectedAmount ?? null,
    status: d.status || 'active',
    updates: (d.updates || [])
      .map((u) => ({ message: u.message, date: u.date }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    lastUpdated: d.lastUpdated ?? null,
  };
};

/** GET /api/campaign (public) */
async function getCampaign(req, res, next) {
  try {
    res.set('Cache-Control', 'public, max-age=30');
    if (!isDbReady()) return res.json(serialize(null));
    const doc = await Campaign.findOne({ key: 'main' }).lean();
    return res.json(serialize(doc));
  } catch (err) {
    return next(err);
  }
}

/** PUT /api/campaign (admin only) */
async function updateCampaign(req, res, next) {
  try {
    const { errors, data } = validateCampaignUpdate(req.body);
    if (errors.length) return res.status(400).json({ error: 'Invalid input.', details: errors });
    if (!isDbReady()) return res.status(503).json({ error: 'The database is not connected right now.' });

    const doc = await Campaign.findOneAndUpdate(
      { key: 'main' },
      { $set: { ...data, lastUpdated: new Date() } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    return res.json(serialize(doc));
  } catch (err) {
    return next(err);
  }
}

/** GET /api/campaign/verify (admin only): lets the admin page check the secret */
function verifyAdmin(req, res) {
  res.json({ ok: true });
}

module.exports = { getCampaign, updateCampaign, verifyAdmin, serialize };
