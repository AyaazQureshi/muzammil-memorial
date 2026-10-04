const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.error || `Request failed (${res.status})`);
    err.details = body.details;
    err.status = res.status;
    throw err;
  }
  return body;
}

export const fetchCampaign = (signal) => request('/api/campaign', { signal });
export const verifyAdminSecret = (secret) => request('/api/campaign/verify', { headers: { 'x-admin-secret': secret } });
export const saveCampaign = (secret, payload) =>
  request('/api/campaign', { method: 'PUT', headers: { 'x-admin-secret': secret }, body: JSON.stringify(payload) });
