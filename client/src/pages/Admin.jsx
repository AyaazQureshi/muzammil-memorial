import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCampaign, saveCampaign, verifyAdminSecret } from '../utils/api.js';

const field = 'mt-2 min-h-12 w-full rounded-xl border border-sand bg-paper px-4 text-lg outline-none focus:border-navy focus:ring-2 focus:ring-navy/25';

export default function Admin() {
  const [secret, setSecret] = useState(''); // kept in memory only, never stored
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ targetAmount: '', collectedAmount: '', status: 'active' });
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = 'Campaign admin';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const apply = (c) => {
    setForm({
      targetAmount: c.targetAmount ?? '',
      collectedAmount: c.collectedAmount ?? '',
      status: c.status || 'active',
    });
    setUpdates(c.updates || []);
  };

  const unlock = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage({ type: '', text: '' });
    try {
      await verifyAdminSecret(secret);
      apply(await fetchCampaign());
      setUnlocked(true);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const toAmount = (v) => (String(v).trim() === '' ? null : Number(v));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage({ type: '', text: '' });
    try {
      const pending = newUpdate.trim();
      const nextUpdates = pending ? [{ message: pending, date: new Date().toISOString() }, ...updates] : updates;
      const saved = await saveCampaign(secret, {
        targetAmount: toAmount(form.targetAmount),
        collectedAmount: toAmount(form.collectedAmount),
        status: form.status,
        updates: nextUpdates.map((u) => ({ message: u.message, date: u.date })),
      });
      apply(saved);
      setNewUpdate('');
      setMessage({ type: 'ok', text: 'Saved. The public page now shows these details.' });
    } catch (err) {
      const detail = err.details?.length ? ` ${err.details.join(' ')}` : '';
      setMessage({ type: 'error', text: `${err.message}${detail}` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container-page max-w-xl py-16">
      <Link to="/" className="text-sm font-semibold text-navy hover:underline">&larr; Back to the page</Link>
      <h1 className="mt-6 text-4xl">Campaign admin</h1>
      <p className="mt-3 text-muted">
        Update the fundraising figures shown on the public page. Leave a figure empty to hide the progress bar.
      </p>

      {!unlocked ? (
        <form onSubmit={unlock} className="mt-8">
          <label htmlFor="secret" className="font-semibold">Admin secret</label>
          <input id="secret" type="password" autoComplete="current-password" value={secret} onChange={(e) => setSecret(e.target.value)} className={field} required />
          <button type="submit" disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">
            {busy ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      ) : (
        <form onSubmit={save} className="mt-8 space-y-6">
          <div>
            <label htmlFor="target" className="font-semibold">Target amount (₹)</label>
            <input id="target" inputMode="decimal" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} className={field} />
          </div>
          <div>
            <label htmlFor="collected" className="font-semibold">Collected amount (₹)</label>
            <input id="collected" inputMode="decimal" value={form.collectedAmount} onChange={(e) => setForm({ ...form, collectedAmount: e.target.value })} className={field} />
          </div>
          <div>
            <label htmlFor="status" className="font-semibold">Campaign status</label>
            <select id="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={field}>
              <option value="active">Active (show donation options)</option>
              <option value="paused">Paused (hide donation options)</option>
              <option value="completed">Completed (hide donation options)</option>
            </select>
          </div>

          <div>
            <label htmlFor="update" className="font-semibold">Add an update (optional)</label>
            <textarea id="update" rows={3} maxLength={500} value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} className={`${field} py-3`} />
          </div>

          {updates.length > 0 && (
            <div>
              <p className="font-semibold">Published updates</p>
              <ul className="mt-2 divide-y divide-sand/80 rounded-xl border border-sand bg-white">
                {updates.map((u, i) => (
                  <li key={`${u.date}-${i}`} className="flex items-start justify-between gap-3 p-4">
                    <span className="text-sm">{u.message}</span>
                    <button type="button" className="shrink-0 text-sm font-semibold text-[#9B2C2C] hover:underline" onClick={() => setUpdates(updates.filter((_, j) => j !== i))}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">Removals take effect when you save.</p>
            </div>
          )}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      )}

      {message.text && (
        <p role="status" className={`mt-6 rounded-lg px-4 py-3 text-sm ${message.type === 'ok' ? 'bg-navy-soft text-navy-dark' : 'bg-[#FBEAEA] text-[#7A2121]'}`}>
          {message.text}
        </p>
      )}
    </main>
  );
}
