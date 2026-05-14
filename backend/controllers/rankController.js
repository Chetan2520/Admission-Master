const Rank = require('../models/Rank');
const { predictRank } = require('../utils/rankService');
const xlsx = require('xlsx');

/**
 * @desc    Get all ranks with pagination and filters
 * @route   GET /api/admin/ranks
 */
const getRanks = async (req, res) => {
  try {
    const { year, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (year) query.year = year;
    if (search) {
      query.marks = search;
    }

    const total = await Rank.countDocuments(query);
    const ranks = await Rank.find(query)
      .sort({ year: -1, marks: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.status(200).json({
      success: true,
      data: ranks,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create a single rank record
 * @route   POST /api/admin/ranks
 */
const createRank = async (req, res) => {
  try {
    const { year, marks, minRank, maxRank, avgRank, percentile, totalStudents } = req.body;

    // Check for duplicate
    const existing = await Rank.findOne({ year, marks });
    if (existing) {
      return res.status(400).json({ success: false, message: `Rank data for ${marks} marks in ${year} already exists.` });
    }

    const rank = await Rank.create({
      year, marks, minRank, maxRank, avgRank, percentile, totalStudents
    });

    res.status(201).json({ success: true, data: rank });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a rank record
 * @route   PATCH /api/admin/ranks/:id
 */
const updateRank = async (req, res) => {
  try {
    const rank = await Rank.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!rank) {
      return res.status(404).json({ success: false, message: 'Rank record not found' });
    }
    res.status(200).json({ success: true, data: rank });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a rank record
 * @route   DELETE /api/admin/ranks/:id
 */
const deleteRank = async (req, res) => {
  try {
    const rank = await Rank.findByIdAndDelete(req.params.id);
    if (!rank) {
      return res.status(404).json({ success: false, message: 'Rank record not found' });
    }
    res.status(200).json({ success: true, message: 'Rank record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Bulk upload ranks from Excel
 * @route   POST /api/admin/ranks/bulk-upload
 */
const bulkUploadRanks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an Excel file' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    const recordsToInsert = [];

    for (const [index, row] of data.entries()) {
      const { Year, Marks, MinRank, MaxRank, AvgRank, Percentile, TotalStudents } = row;

      // Basic validation
      if (!Year || Marks === undefined || !MinRank || !MaxRank || !AvgRank) {
        results.failed++;
        results.errors.push(`Row ${index + 2}: Missing required fields (Year, Marks, MinRank, MaxRank, AvgRank)`);
        continue;
      }

      recordsToInsert.push({
        year: Year,
        marks: Marks,
        minRank: Math.abs(MinRank),
        maxRank: Math.abs(MaxRank),
        avgRank: Math.abs(AvgRank),
        percentile: Percentile,
        totalStudents: TotalStudents
      });
    }

    // Process insertions (using upsert to prevent duplicates or handle updates)
    for (const record of recordsToInsert) {
      try {
        await Rank.findOneAndUpdate(
          { year: record.year, marks: record.marks },
          record,
          { upsert: true, new: true }
        );
        results.success++;
      } catch (err) {
        results.failed++;
        results.errors.push(`Error inserting ${record.marks} marks for ${record.year}: ${err.message}`);
      }
    }

    res.status(200).json({
      success: true,
      message: `Bulk upload completed. Success: ${results.success}, Failed: ${results.failed}`,
      results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Predict rank from marks (Public API)
 * @route   GET /api/predictor/predict-rank
 */
const getRankPrediction = async (req, res) => {
  try {
    const { marks, year = 2025 } = req.query;

    if (marks === undefined) {
      return res.status(400).json({ success: false, message: 'Marks are required' });
    }

    const prediction = await predictRank(parseInt(marks), parseInt(year));
    res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRanks,
  createRank,
  updateRank,
  deleteRank,
  bulkUploadRanks,
  getRankPrediction
};
