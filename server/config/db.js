const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const isDbReady = () => mongoose.connection.readyState === 1;

/**
 * Connects to MongoDB. If the connection fails the website keeps running
 * (the campaign section simply shows its "will be updated" message) and the
 * connection is retried in the background.
 */
async function connectDB(uri) {
  if (!uri) {
    console.warn('[db] MONGODB_URI is not set. Running without a database; campaign progress will not be available.');
    return;
  }
  const attempt = async () => {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
      console.log('[db] MongoDB connected');
    } catch (err) {
      console.error(`[db] MongoDB connection failed: ${err.message}. Retrying in 15s.`);
      setTimeout(attempt, 15000).unref?.();
    }
  };
  await attempt();
}

module.exports = { connectDB, isDbReady };
