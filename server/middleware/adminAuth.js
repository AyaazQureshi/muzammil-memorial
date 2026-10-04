const crypto = require('crypto');

const digest = (value) => crypto.createHash('sha256').update(String(value)).digest();

/**
 * Protects write endpoints with the ADMIN_SECRET environment variable.
 * The secret is sent in the `x-admin-secret` header, compared in constant time.
 */
function adminAuth(req, res, next) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 12) {
    return res.status(503).json({ error: 'Admin updates are not configured on this server.' });
  }
  const provided = req.get('x-admin-secret') || '';
  if (!crypto.timingSafeEqual(digest(provided), digest(secret))) {
    return res.status(401).json({ error: 'The admin secret is incorrect.' });
  }
  return next();
}

module.exports = adminAuth;
