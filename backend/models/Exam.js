const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required'],
    trim: true
  },
  authority: {
    type: String,
    required: [true, 'Conducting authority is required'],
    trim: true
  },
  mode: {
    type: String,
    required: [true, 'Exam mode is required'],
    enum: ['Online (CBT)', 'Offline (OMR)', 'Hybrid'],
    default: 'Online (CBT)'
  },
  totalMarks: {
    type: String,
    required: [true, 'Total marks are required']
  },
  examDate: {
    type: Date,
    required: [true, 'Exam date is required']
  },
  expectedResultDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Postponed'],
    default: 'Upcoming'
  },
  description: {
    type: String
  },
  initial: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Middleware to set 'initial' if not provided
examSchema.pre('save', function() {
  if (!this.initial && this.name) {
    this.initial = this.name.substring(0, 2).toUpperCase();
  }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
