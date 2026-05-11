const mongoose = require('mongoose');
  
/**
 * College Model
 * Stores comprehensive information about educational institutions.
 * Includes text indexing for high-performance search across name and location.
 */
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shortName: { type: String, trim: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  type: { type: String, enum: ['Govt', 'Private', 'Semi-Govt'], default: 'Govt' },
  rating: { type: Number, default: 0 },
  nirfRank: { type: Number },
  seats: { type: Number, default: 0 },
  averageCourseFees: { type: String },
  website: { type: String },
  description: { type: String },
  logo: { type: String },
  affiliatedWith: { type: String },
  entranceExams: [String],
  images: [String],
  courses: [{
    name: String,
    branches: [{
      name: String,  
      duration: String,
      fees: String
    }]
  }]
}, { timestamps: true });

// Indexing for faster searches
collegeSchema.index({ name: 'text', location: 'text', state: 'text' });
collegeSchema.index({ type: 1 });
collegeSchema.index({ state: 1 });
collegeSchema.index({ shortName: 1 });
collegeSchema.index({ nirfRank: 1 });
collegeSchema.index({ rating: -1 });
                                        
const College = mongoose.model('College', collegeSchema);

module.exports = College;
