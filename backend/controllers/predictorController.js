const Cutoff = require('../models/Cutoff');

/**
 * @desc    Predict colleges based on rank, exam, and category
 * @route   GET /api/predictor/predict
 * @access  Public (or Private after login)
 */
const predictColleges = async (req, res) => {
  const { exam, rank, category, type, state, page = 1, limit = 10 } = req.query;

  if (!exam || !rank || !category) {
    res.status(400);
    throw new Error('Missing required parameters: exam, rank, or category');
  }

  try {
    const query = {
      exam: exam,
      category: category,
      closingRank: { $gte: parseInt(rank) }
    };

    // If type or state filters are provided, find matching colleges first
    if (type || state) {
      const collegeQuery = {};
      if (type) collegeQuery.type = type;
      if (state) collegeQuery.state = state;
      
      const matchingColleges = await require('../models/College').find(collegeQuery).select('_id');
      const collegeIds = matchingColleges.map(c => c._id);
      query.collegeId = { $in: collegeIds };
    }

    const total = await Cutoff.countDocuments(query);
    const results = await Cutoff.find(query)
      .populate('collegeId')
      .sort({ closingRank: 1 })
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
