const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const createApp = require('./app');
const { connectDB } = require('./config/db');

const PORT = Number(process.env.PORT) || 5000;

const app = createApp();
app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
  if (!process.env.ADMIN_SECRET || process.env.ADMIN_SECRET.length < 12) {
    console.warn('[server] ADMIN_SECRET is missing or shorter than 12 characters. Campaign updates are disabled.');
  }
});

connectDB(process.env.MONGODB_URI);
