const mongoose = require('mongoose');

/**
 * Rank Model
 * Stores mapping between marks and AIR rank for a specific year.
 */
const rankSchema = new mongoose.Schema({
  year: { 
    type: Number, 
    required: true, 
    index: true 
  },
  marks: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 720,
    index: true
  },
  minRank: { 
    type: Number, 
    required: true 
  },
  maxRank: { 
    type: Number, 
    required: true 
  },
  avgRank: { 
    type: Number, 
    required: true 
  },
  percentile: { 
    type: Number 
  },
  totalStudents: { 
    type: Number 
  }
}, { timestamps: true });

// Unique compound index to prevent duplicate marks for the same year
rankSchema.index({ year: 1, marks: 1 }, { unique: true });

// Index for efficient range queries
rankSchema.index({ year: 1, marks: -1 });

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;
