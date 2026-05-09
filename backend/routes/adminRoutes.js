const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadColleges,
  uploadCutoffs,
  createCollege,
  getColleges,
  createCutoff,
  createBulkCutoffs,
  getCutoffs,
  uploadCourses,
  updateCollege,
  exportColleges,
  deleteAllColleges,
  deleteAllCutoffs,
  getCollegeFullDetails,
} = require("../controllers/adminController");

const {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  deleteAllExams,
} = require("../controllers/examController");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Exam Management Routes
 */
router.route("/exams").get(getExams).post(createExam);

router
  .route("/exams/:id")
  .get(getExamById)
  .patch(updateExam)
  .delete(deleteExam);

router.delete("/exams/bulk/delete-all", deleteAllExams);

/**
 * College Management Routes
 */
router.route("/colleges").post(createCollege).get(getColleges);
router.delete("/colleges/bulk/delete-all", deleteAllColleges);

router.route("/colleges/:id").patch(updateCollege);
router.get("/colleges/:id/full-details", getCollegeFullDetails);

router.post("/upload-colleges", upload.single("file"), uploadColleges);
router.post("/upload-cutoffs", upload.single("file"), uploadCutoffs);
router.post("/upload-courses", upload.single("file"), uploadCourses);
router.get("/export-colleges", exportColleges);
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    const { uploadImage } = require("../utils/cloudinary");
    const result = await uploadImage(req.file.buffer);
    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Cutoff Management Routes
 */
router.route('/cutoffs')
  .post(createCutoff)
  .get(getCutoffs);

router.post('/cutoffs/bulk', createBulkCutoffs);
router.delete('/cutoffs/bulk/delete-all', deleteAllCutoffs);

module.exports = router;
