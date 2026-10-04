const path = require('path');
const fs = require('fs');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const campaignRoutes = require('./routes/campaignRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';

  if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:'],
          // avoid forcing https on plain-http localhost during development
          'upgrade-insecure-requests': isProd ? [] : null,
        },
      },
    })
  );

  const origins = (process.env.CLIENT_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (origins.length) app.use('/api', cors({ origin: origins, methods: ['GET', 'PUT'] }));

  app.use(express.json({ limit: '10kb' }));
  app.use('/api', rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  app.use('/api/campaign', campaignRoutes);
  app.use('/api', notFound);

  // Serve the built React app in production (single-service deployment).
  const dist = path.join(__dirname, '..', 'client', 'dist');
  if (fs.existsSync(dist)) {
    app.use('/assets', express.static(path.join(dist, 'assets'), { maxAge: '1y', immutable: true }));
    app.use(express.static(dist, { maxAge: '1h' }));
    app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}

module.exports = createApp;
