const mongoose = require('mongoose');

/**
 * Cutoff Model
 * Stores opening and closing ranks for college courses based on exam and category.
 * Uses compound indexing for rapid predictor engine calculations.
 */
const cutoffSchema = new mongoose.Schema({
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  exam: { type: String, required: true, index: true },
  year: { type: Number, required: true, index: true },
  round: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  category: { type: String, required: true, index: true },
  quota: { type: String, required: true },
  openingRank: { type: Number, required: true },
  closingRank: { type: Number, required: true, index: true },
  seats: { type: Number, default: 0 },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' }
}, { timestamps: true });

// Compound Index for Predictor Engine
// This ensures that queries filtering by exam, category, and rank are extremely fast.
cutoffSchema.index({ exam: 1, category: 1, closingRank: 1, year: -1 });

const Cutoff = mongoose.model('Cutoff', cutoffSchema);

module.exports = Cutoff;
