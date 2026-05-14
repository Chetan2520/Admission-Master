const Rank = require('../models/Rank');

/**
 * Predicts the AIR Rank range based on NEET marks using stored data and interpolation.
 * 
 * @param {number} marks - NEET marks (0-720)
 * @param {number} year - Target year for prediction
 * @returns {Promise<Object>} - Predicted rank range and average
 */
const predictRank = async (marks, year) => {
  // 0. Check if any data exists for the requested year, if not, use the latest available year
  let targetYear = year;
  const yearExists = await Rank.exists({ year });
  if (!yearExists) {
    const latestRecord = await Rank.findOne().sort({ year: -1 });
    if (!latestRecord) {
      throw new Error(`No rank data available in the database. Please contact admin.`);
    }
    targetYear = latestRecord.year;
  }

  // 1. Check for exact match
  const exactMatch = await Rank.findOne({ year: targetYear, marks });
  if (exactMatch) {
    return {
      minRank: exactMatch.minRank,
      maxRank: exactMatch.maxRank,
      avgRank: exactMatch.avgRank,
      isExact: true,
      dataYear: targetYear
    };
  }

  // 2. Interpolation Logic
  // Find the closest marks above and below the input marks
  const [above, below] = await Promise.all([
    Rank.findOne({ year: targetYear, marks: { $gt: marks } }).sort({ marks: 1 }),
    Rank.findOne({ year: targetYear, marks: { $lt: marks } }).sort({ marks: -1 })
  ]);

  // Case: Marks are higher than any stored record
  if (!above && below) {
    const ratio = marks / below.marks;
    return {
      minRank: Math.max(1, Math.round(below.minRank / ratio)),
      maxRank: Math.max(1, Math.round(below.maxRank / ratio)),
      avgRank: Math.max(1, Math.round(below.avgRank / ratio)),
      isExact: false,
      dataYear: targetYear,
      note: "Extrapolated (Higher than stored)"
    };
  }

  // Case: Marks are lower than any stored record
  if (above && !below) {
    const ratio = above.marks / marks;
    return {
      minRank: Math.round(above.minRank * ratio),
      maxRank: Math.round(above.maxRank * ratio),
      avgRank: Math.round(above.avgRank * ratio),
      isExact: false,
      dataYear: targetYear,
      note: "Extrapolated (Lower than stored)"
    };
  }

  // Case: No data at all for this year
  if (!above && !below) {
    throw new Error(`No rank data available for the year ${year}. Please contact admin.`);
  }

  // Case: Interpolate between above and below
  // Linear Interpolation: y = y0 + (x - x0) * ((y1 - y0) / (x1 - x0))
  // x = marks, y = rank
  // x0 = below.marks, y0 = below.rank
  // x1 = above.marks, y1 = above.rank
  
  const interpolate = (x, x0, x1, y0, y1) => {
    return Math.round(y0 + (x - x0) * ((y1 - y0) / (x1 - x0)));
  };

  const predictedMin = interpolate(marks, below.marks, above.marks, below.minRank, above.minRank);
  const predictedMax = interpolate(marks, below.marks, above.marks, below.maxRank, above.maxRank);
  const predictedAvg = interpolate(marks, below.marks, above.marks, below.avgRank, above.avgRank);

  return {
    minRank: predictedMin,
    maxRank: predictedMax,
    avgRank: predictedAvg,
    isExact: false
  };
};

module.exports = {
  predictRank
};
