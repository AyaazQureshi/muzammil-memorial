const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true, maxlength: 500 },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

/**
 * A single document (key: "main") holds the campaign state.
 * targetAmount / collectedAmount stay null until the administrator sets them,
 * so the website never shows a number nobody provided.
 */
const campaignSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true, immutable: true },
    targetAmount: { type: Number, min: 0, default: null },
    collectedAmount: { type: Number, min: 0, default: null },
    status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
    updates: { type: [updateSchema], default: [] },
    lastUpdated: { type: Date, default: null },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Campaign', campaignSchema);
