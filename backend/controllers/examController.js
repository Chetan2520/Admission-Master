const Exam = require('../models/Exam');

/**
 * @desc    Get all exams
 * @route   GET /api/admin/exams
 * @access  Private/Admin
 */
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single exam
 * @route   GET /api/admin/exams/:id
 * @access  Private/Admin
 */
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create new exam
 * @route   POST /api/admin/exams
 * @access  Private/Admin
 */
const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update exam
 * @route   PATCH /api/admin/exams/:id
 * @access  Private/Admin
 */
const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete exam
 * @route   DELETE /api/admin/exams/:id
 * @access  Private/Admin
 */
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.status(200).json({ success: true, message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete all exams
 * @route   DELETE /api/admin/exams/delete-all
 * @access  Private/Admin
 */
const deleteAllExams = async (req, res) => {
  try {
    const result = await Exam.deleteMany({});
    res.status(200).json({ success: true, message: `All ${result.deletedCount} exams deleted.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  deleteAllExams
};
