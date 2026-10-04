const express = require('express');
const rateLimit = require('express-rate-limit');
const adminAuth = require('../middleware/adminAuth');
const { getCampaign, updateCampaign, verifyAdmin } = require('../controllers/campaignController');

const router = express.Router();

// Slows down anyone trying to guess the admin secret.
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
});

router.get('/', getCampaign);
router.get('/verify', adminLimiter, adminAuth, verifyAdmin);
router.put('/', adminLimiter, adminAuth, updateCampaign);

module.exports = router;
