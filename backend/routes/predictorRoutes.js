const express = require('express');
const router = express.Router();
const { predictColleges } = require('../controllers/predictorController');
const { getRankPrediction } = require('../controllers/rankController');

/**
 * Predictor Engine Routes
 * Handles student college matching based on rank and criteria.
 */

// Route to get college predictions
router.get('/predict', predictColleges);

// Route to predict rank from marks
router.get('/predict-rank', getRankPrediction);

module.exports = router;
