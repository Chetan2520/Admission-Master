const express = require('express');
const router = express.Router();
const { predictColleges } = require('../controllers/predictorController');

/**
 * Predictor Engine Routes
 * Handles student college matching based on rank and criteria.
 */

// Route to get college predictions
router.get('/predict', predictColleges);

module.exports = router;
