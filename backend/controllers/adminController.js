const xlsx = require("xlsx");
const College = require("../models/College");
const Cutoff = require("../models/Cutoff");

/**
 * @desc    Upload Colleges via Excel/CSV
 * @route   POST /api/admin/upload-colleges
 * @access  Private/Admin
 */
const uploadColleges = async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an Excel or CSV file");
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (rawData.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "The uploaded file is empty or has invalid headers.",
        });
    }

    // Process and validate data
    const processedData = rawData.map((item, index) => {
      // Flexible Mapping: Try to find values from common header variations
      const name =
        item.name ||
        item["College Name"] ||
        item["Institution"] ||
        item["Name"];
      const location =
        item.location || item["City"] || item["District"] || item["Location"];
      const state = item.state || item["State"];
      const shortName = item.shortName || item["Short Name"];
      const type = item.type || item["College Type"] || "Govt";
      const nirfRank = item.nirfRank || item["NIRF Ranking"] || item["NIRF"];

      // Basic validation for required fields
      if (!name || !location || !state) {
        throw new Error(
          `Row ${index + 2} is missing required data. Ensure columns for Name, City/Location, and State exist.`,
        );
      }

      return {
        ...item,
        name,
        location,
        state,
        shortName,
        type,
        nirfRank,
        entranceExams:
          typeof item.entranceExams === "string"
            ? item.entranceExams.split(",").map((s) => s.trim())
            : Array.isArray(item.entranceExams)
              ? item.entranceExams
              : [],
      };
    });

    // insertMany ADDS to the existing collection, it does NOT overwrite.
    const result = await College.insertMany(processedData, { ordered: false });

    res.status(200).json({
      success: true,
      count: result.length,
      message: `${result.length} colleges added to the database.`,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * @desc    Upload Cutoffs via Excel/CSV
 * @route   POST /api/admin/upload-cutoffs
 * @access  Private/Admin
 */
const uploadCutoffs = async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an Excel or CSV file");
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Sheet Name:", sheetName);
    console.log("Rows Found:", data.length);
    if (data.length > 0) console.log("First Row Keys:", Object.keys(data[0]));

    if (data.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "The uploaded file is empty." });
    }

    let processedCount = 0;
    let errorRows = [];
    let cutoffsToInsert = [];

    // Pre-fetch all colleges to optimize lookup if needed,
    // but for very large datasets, we'll do it per row or use a cache.
    const collegeCache = new Map();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2;

      // Identify College
      const collegeIdentifier =
        row.collegeShortName ||
        row["College Short Name"] ||
        row.shortName ||
        row["Short Name"] ||
        row.college ||
        row["College Name"];

      if (!collegeIdentifier) {
        errorRows.push({
          row: rowNum,
          error: "Missing College Identifier (Short Name or Name)",
        });
        continue;
      }

      let collegeId = null;
      if (collegeCache.has(collegeIdentifier.toString().toLowerCase())) {
        collegeId = collegeCache.get(
          collegeIdentifier.toString().toLowerCase(),
        );
      } else {
        const college = await College.findOne({
          $or: [
            { shortName: new RegExp(`^${collegeIdentifier}$`, "i") },
            { name: new RegExp(`^${collegeIdentifier}$`, "i") },
          ],
        });

        if (college) {
          collegeId = college._id;
          collegeCache.set(
            collegeIdentifier.toString().toLowerCase(),
            collegeId,
          );
        }
      }

      if (!collegeId) {
        console.log(`College Match Failed: ${collegeIdentifier}`);
        errorRows.push({
          row: rowNum,
          error: `College "${collegeIdentifier}" not found in database.`,
        });
        continue;
      }

      // Extract Fields with multi-variation support
      const exam = row.exam || row["Exam"] || row["Entrance Exam"];
      const year = row.year || row["Year"] || new Date().getFullYear();
      const round = row.round || row["Round"] || "1";
      const course = row.course || row["Course"];
      const branch = row.branch || row["Branch"] || row["Stream"] || "General";
      const category = row.category || row["Category"];
      const quota = row.quota || row["Quota"] || "AIQ";
      const openingRank =
        row.openingRank || row["Opening Rank"] || row["Opening"];
      const closingRank =
        row.closingRank || row["Closing Rank"] || row["Closing"];

      // Validation
      if (
        !exam ||
        !course ||
        !category ||
        openingRank === undefined ||
        closingRank === undefined
      ) {
        errorRows.push({
          row: rowNum,
          error: "Missing required fields (Exam, Course, Category, Ranks)",
        });
        continue;
      }

      cutoffsToInsert.push({
        collegeId,
        exam,
        year: parseInt(year),
        round: round.toString(),
        course,
        branch,
        category,
        quota,
        openingRank: parseInt(openingRank),
        closingRank: parseInt(closingRank),
      });
      processedCount++;
    }

    if (cutoffsToInsert.length > 0) {
      // Use ordered: false to continue inserting even if some fail (e.g. validation)
      await Cutoff.insertMany(cutoffsToInsert, { ordered: false });
    }

    res.status(200).json({
      success: true,
      count: processedCount,
      errors: errorRows.length > 0 ? errorRows : null,
      message: `Successfully processed ${processedCount} cutoff records.`,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * @desc    Create a single college entry
 * @route   POST /api/admin/colleges
 * @access  Private/Admin
 */
const createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json({ success: true, data: college });
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to create college: ${error.message}`);
  }
};

/**
 * @desc    Get all colleges with search and pagination
 * @route   GET /api/admin/colleges
 * @access  Private/Admin
 */
const getColleges = async (req, res) => {
  const {
    search,
    type,
    state,
    minNIRF,
    maxNIRF,
    affiliatedWith,
    exam,
    minRating,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  // Text search (Name or Location)
  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { location: new RegExp(search, "i") },
      { shortName: new RegExp(search, "i") },
    ];
  }

  // Advanced Filters
  if (type) query.type = type;
  if (state) query.state = new RegExp(state, "i");
  if (affiliatedWith) query.affiliatedWith = new RegExp(affiliatedWith, "i");
  if (exam) query.entranceExams = { $in: [new RegExp(exam, "i")] };
  if (minRating) query.rating = { $gte: parseFloat(minRating) };

  if (minNIRF || maxNIRF) {
    query.nirfRank = {};
    if (minNIRF) query.nirfRank.$gte = parseInt(minNIRF);
    if (maxNIRF) query.nirfRank.$lte = parseInt(maxNIRF);
  }

  try {
    const total = await College.countDocuments(query);
    const colleges = await College.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ nirfRank: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: colleges,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Fetch error: ${error.message}`);
  }
};

/**
 * @desc    Create a single cutoff entry
 * @route   POST /api/admin/cutoffs
 * @access  Private/Admin
 */
const createCutoff = async (req, res) => {
  try {
    const cutoff = await Cutoff.create(req.body);
    res.status(201).json({ success: true, data: cutoff });
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to create cutoff: ${error.message}`);
  }
};

/**
 * @desc    Get all cutoffs with filters and pagination
 * @route   GET /api/admin/cutoffs
 * @access  Private/Admin
 */
const getCutoffs = async (req, res) => {
  const { search, exam, year, round, page = 1, limit = 10 } = req.query;

  const query = {};
  if (exam) query.exam = new RegExp(exam, "i");
  if (year && year !== "All") query.year = parseInt(year);
  if (round && round !== "All") query.round = round;

  if (search) {
    // 1. Find colleges matching the search term
    const matchingColleges = await College.find({
      $or: [
        { name: new RegExp(search, "i") },
        { shortName: new RegExp(search, "i") },
      ],
    }).select("_id");

    const collegeIds = matchingColleges.map((c) => c._id);

    // 2. Build the cutoff query
    query.$or = [
      { collegeId: { $in: collegeIds } },
      { exam: new RegExp(search, "i") },
      { course: new RegExp(search, "i") },
      { branch: new RegExp(search, "i") },
      { category: new RegExp(search, "i") },
    ];
  }

  try {
    const total = await Cutoff.countDocuments(query);
    const cutoffs = await Cutoff.find(query)
      .populate("collegeId")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: cutoffs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Fetch error: ${error.message}`);
  }
};

/**
 * @desc    Upload Courses via Excel/CSV
 * @route   POST /api/admin/upload-courses
 * @access  Private/Admin
 */
const uploadCourses = async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an Excel or CSV file");
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    let updatedCount = 0;
    let errors = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const collegeIdentifier =
        row.name || row["College Name"] || row.shortName || row["Short Name"];
      const coursesStr = row.courses || row["Courses"];

      if (!collegeIdentifier || !coursesStr) {
        errors.push(`Row ${i + 2}: Missing college name or courses`);
        continue;
      }

      // Find college by name or short name
      const college = await College.findOne({
        $or: [
          { name: new RegExp(`^${collegeIdentifier}$`, "i") },
          { shortName: new RegExp(`^${collegeIdentifier}$`, "i") },
        ],
      });

      if (!college) {
        errors.push(`Row ${i + 2}: College "${collegeIdentifier}" not found`);
        continue;
      }

      // Parse courses (comma separated)
      const courseNames = coursesStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      // Map to the object structure expected by the schema
      const newCourses = courseNames.map((name) => ({
        name,
        duration: row.duration || row["Duration"] || "4 Years",
        fees: row.fees || row["Fees"] || "N/A",
      }));

      // Update college - we'll add new courses and avoid duplicates by name if possible
      // For simplicity, we'll just overwrite or append. Let's append but check for duplicates.
      const existingCourseNames = college.courses.map((c) =>
        c.name.toLowerCase(),
      );
      const coursesToAdd = newCourses.filter(
        (nc) => !existingCourseNames.includes(nc.name.toLowerCase()),
      );

      if (coursesToAdd.length > 0) {
        college.courses.push(...coursesToAdd);
        await college.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      success: true,
      updatedCount,
      errors: errors.length > 0 ? errors : null,
      message: `${updatedCount} colleges updated with new courses.`,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * @desc    Update a college entry
 * @route   PATCH /api/admin/colleges/:id
 * @access  Private/Admin
 */
const updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!college)
      return res
        .status(404)
        .json({ success: false, message: "College not found" });
    res.status(200).json({ success: true, data: college });
  } catch (error) {
    res.status(400);
    throw new Error(`Update failed: ${error.message}`);
  }
};

/**
 * @desc    Export all colleges to Excel
 * @route   GET /api/admin/export-colleges
 * @access  Private/Admin
 */
const exportColleges = async (req, res) => {
  try {
    const colleges = await College.find({}).lean();

    // Map data to a flat structure for Excel
    const data = colleges.map((c) => ({
      Name: c.name,
      "Short Name": c.shortName || "",
      Location: c.location,
      State: c.state,
      Type: c.type,
      Rating: c.rating,
      "NIRF Rank": c.nirfRank || "",
      Website: c.website || "",
      "Affiliated With": c.affiliatedWith || "",
      "Entrance Exams": c.entranceExams ? c.entranceExams.join(", ") : "",
      Courses: c.courses
        ? c.courses.map((course) => course.name).join(", ")
        : "",
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Colleges");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Colleges_Data.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (error) {
    res.status(500);
    throw new Error(`Export failed: ${error.message}`);
  }
};

module.exports = {
  uploadColleges,
  uploadCutoffs,
  createCollege,
  getColleges,
  createCutoff,
  getCutoffs,
  uploadCourses,
  updateCollege,
  exportColleges,
};
