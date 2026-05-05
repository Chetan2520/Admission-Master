const Cutoff = require('../models/Cutoff');

/**
 * @desc    Predict colleges based on rank, exam, and category
 * @route   GET /api/predictor/predict
 * @access  Public (or Private after login)
 */
const predictColleges = async (req, res) => {
  const { exam, rank, category, page = 1, limit = 20 } = req.query;

  // Basic validation for required search parameters
  if (!exam || !rank || !category) {
    res.status(400);
    throw new Error('Missing required parameters: exam, rank, or category');
  }

  try {
    // Define query logic: closing rank must be greater than or equal to user's rank
    const query = {
      exam: exam,
      category: category,
      closingRank: { $gte: parseInt(rank) }
    };

    // Calculate total results for pagination metadata
    const total = await Cutoff.countDocuments(query);
    
    // Execute optimized query with pagination and population
    const results = await Cutoff.find(query)
      .populate('collegeId')
      .sort({ closingRank: 1 }) // Show most relevant (closest rank) first
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        totalResults: total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Prediction engine error: ${error.message}`);
  }
};

module.exports = {
  predictColleges
};
