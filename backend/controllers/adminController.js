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
        averageCourseFees: item.fees || item["Fees"] || item["Average Fees"],
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

      // Extract Fields with robust normalization (remove spaces, lowercase, special chars)
      const getVal = (keys) => {
        if (!row) return null;
        const normalize = (s) => s ? s.toString().toLowerCase().replace(/[^a-z0-9]/g, '') : '';
        const normalizedKeys = keys.map(normalize);
        
        const foundKey = Object.keys(row).find(k => 
          normalizedKeys.includes(normalize(k))
        );
        return foundKey ? row[foundKey] : null;
      };

      // Identify College using robust getVal helper
      const collegeIdentifier = getVal(["college", "collegename", "shortname", "collegeshortname"]);

      if (!collegeIdentifier) {
        console.log(`Row ${rowNum} Error: Missing College Identifier in headers:`, Object.keys(row));
        errorRows.push({
          row: rowNum,
          error: "Missing College Name or Short Name in Excel columns.",
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
        const available = await College.find({}).limit(3).select('shortName name');
        const examples = available.map(c => c.shortName || c.name).join(", ");
        
        console.log(`College Match Failed: ${collegeIdentifier}`);
        errorRows.push({
          row: rowNum,
          error: `College "${collegeIdentifier}" not found. Did you mean: ${examples}...? Check 'Manage Colleges' for exact names.`,
        });
        continue;
      }


      const exam = getVal(["exam", "entranceexam", "examname", "entrance"]);
      const year = getVal(["year", "academicyear", "session"]) || new Date().getFullYear();
      const round = getVal(["round", "counselinground", "cround"]) || "1";
      const course = getVal(["course", "coursename", "degree", "program"]);
      const branch = getVal(["branch", "stream", "specialization", "discipline"]) || "General";
      const category = getVal(["category", "caste", "reservation", "cat"]);
      const quota = getVal(["quota", "type", "seatquota"]) || "AIQ";
      let openingRank = getVal(["openingrank", "opening", "or", "startrank", "rankfrom"]);
      let closingRank = getVal(["closingrank", "closing", "cr", "endrank", "rankto"]);
      
      // Support for a single "Ranks" column (e.g., "100-500" or "100 / 500")
      if ((openingRank === null || closingRank === null)) {
        const combinedRanks = getVal(["ranks", "rank", "cutoff", "cutoffs"]);
        if (combinedRanks && combinedRanks.toString().includes("-")) {
          const parts = combinedRanks.toString().split("-");
          openingRank = parts[0].trim();
          closingRank = parts[1].trim();
        } else if (combinedRanks && combinedRanks.toString().includes("/")) {
          const parts = combinedRanks.toString().split("/");
          openingRank = parts[0].trim();
          closingRank = parts[1].trim();
        } else if (combinedRanks && combinedRanks.toString().trim().includes(" ")) {
          const parts = combinedRanks.toString().trim().split(/\s+/);
          openingRank = parts[0];
          closingRank = parts[1] || parts[0];
        } else if (combinedRanks) {
          openingRank = combinedRanks;
          closingRank = combinedRanks;
        }
      }

      const seats = getVal(["seats", "seatcount", "intake", "totalinteke"]) || 0;

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
        seats: parseInt(seats),
      });
      processedCount++;
    }

    let savedCount = 0;
    if (cutoffsToInsert.length > 0) {
      const result = await Cutoff.insertMany(cutoffsToInsert, { ordered: false });
      savedCount = result.length;
      console.log(`Bulk Insert Success: ${savedCount} records saved.`);
    }

    res.status(200).json({
      success: true,
      count: savedCount,
      totalProcessed: processedCount,
      errors: errorRows.length > 0 ? errorRows : null,
      message: savedCount > 0 
        ? `Successfully uploaded ${savedCount} records.` 
        : `No records were uploaded. Check errors for details.`,
    });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    res.status(500).json({
      success: false,
      message: `Upload failed: ${error.message}`,
      errors: error.writeErrors ? error.writeErrors.map(e => ({ row: 'Unknown', error: e.errmsg })) : [error.message]
    });
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
      .sort({ nirfRank: 1, createdAt: -1 })
      .lean(); // Use lean for performance since we'll modify the objects

    // Fetch all cutoffs for these colleges
    const collegeIds = colleges.map(c => c._id);
    const allCutoffs = await Cutoff.find({ collegeId: { $in: collegeIds } }).lean();

    // Map cutoffs to colleges
    const collegesWithCutoffs = colleges.map(college => {
      if (college.courses) {
        college.courses = college.courses.map(course => {
          if (course.branches) {
            course.branches = course.branches.map(branch => {
              // Find cutoffs matching this college, course name and branch name
              const branchCutoffs = allCutoffs.filter(cut => 
                cut.collegeId.toString() === college._id.toString() &&
                cut.course.toLowerCase() === course.name.toLowerCase() &&
                cut.branch.toLowerCase() === branch.name.toLowerCase()
              );
              return { ...branch, cutoffs: branchCutoffs };
            });
          }
          return course;
        });
      }
      return college;
    });

    res.status(200).json({
      success: true,
      data: collegesWithCutoffs,
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
 * @desc    Create multiple cutoff entries (Bulk)
 * @route   POST /api/admin/cutoffs/bulk
 * @access  Private/Admin
 */
const createBulkCutoffs = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }

    const cutoffs = await Cutoff.insertMany(items);
    res.status(201).json({ success: true, count: cutoffs.length, data: cutoffs });
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to create bulk cutoffs: ${error.message}`);
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

    // Grouping rows by college to minimize database saves
    const collegeUpdates = new Map();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const collegeIdentifier = row.name || row["College Name"] || row.shortName || row["Short Name"] || row.college;
      const courseName = row.course || row["Course"] || row["Course Name"];
      const branchName = row.branch || row["Branch"] || "General";
      
      if (!collegeIdentifier || !courseName) {
        errors.push(`Row ${i + 2}: Missing college name or course name`);
        continue;
      }

      // Initialize college data in our update map
      const cid = collegeIdentifier.toString().toLowerCase().trim();
      if (!collegeUpdates.has(cid)) {
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
        collegeUpdates.set(cid, college);
      }

      const college = collegeUpdates.get(cid);
      
      // Find or Create Course
      let course = college.courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());
      if (!course) {
        course = { name: courseName, branches: [] };
        college.courses.push(course);
      }

      // Find or Create Branch within Course
      let branch = course.branches.find(b => b.name.toLowerCase() === branchName.toLowerCase());
      if (branch) {
        // Update existing branch details
        branch.duration = row.duration || row["Duration"] || branch.duration || "4 Years";
        branch.fees = row.fees || row["Fees"] || row["Average Fees"] || branch.fees || "N/A";
      } else {
        // Add new branch
        course.branches.push({
          name: branchName,
          duration: row.duration || row["Duration"] || "4 Years",
          fees: row.fees || row["Fees"] || row["Average Fees"] || "N/A"
        });
      }
      updatedCount++;
    }

    // Save all modified colleges
    for (const college of collegeUpdates.values()) {
      await college.save();
    }

    res.status(200).json({
      success: true,
      updatedCount,
      errors: errors.length > 0 ? errors : null,
      message: `Processed ${updatedCount} course/branch records across ${collegeUpdates.size} colleges.`,
    });
  } catch (error) {
    console.error("Course Upload Error:", error);
    res.status(500).json({
      success: false,
      message: `Upload failed: ${error.message}`
    });
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

      // Map data to a flat structure for Excel - now including branches
      const flatData = [];
      colleges.forEach(c => {
        if (!c.courses || c.courses.length === 0) {
          flatData.push({
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
            "Average Fees": c.averageCourseFees || "",
            Course: "N/A",
            Branch: "N/A",
            Duration: "N/A",
            Fees: "N/A"
          });
        } else {
          c.courses.forEach(course => {
            if (!course.branches || course.branches.length === 0) {
              flatData.push({
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
                "Average Fees": c.averageCourseFees || "",
                Course: course.name,
                Branch: "N/A",
                Duration: "N/A",
                Fees: "N/A"
              });
            } else {
              course.branches.forEach(branch => {
                flatData.push({
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
                  "Average Fees": c.averageCourseFees || "",
                  Course: course.name,
                  Branch: branch.name,
                  Duration: branch.duration,
                  Fees: branch.fees
                });
              });
            }
          });
        }
      });

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(flatData);
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

/**
 * @desc    Delete all colleges
 * @route   DELETE /api/admin/colleges/delete-all
 * @access  Private/Admin
 */
const deleteAllColleges = async (req, res) => {
  try {
    const result = await College.deleteMany({});
    res.status(200).json({ success: true, message: `All ${result.deletedCount} colleges deleted.` });
  } catch (error) {
    res.status(500);
    throw new Error(`Delete failed: ${error.message}`);
  }
};

/**
 * @desc    Delete all cutoffs
 * @route   DELETE /api/admin/cutoffs/delete-all
 * @access  Private/Admin
 */
const deleteAllCutoffs = async (req, res) => {
  try {
    const result = await Cutoff.deleteMany({});
    res.status(200).json({ success: true, message: `All ${result.deletedCount} cutoff records deleted.` });
  } catch (error) {
    res.status(500);
    throw new Error(`Delete failed: ${error.message}`);
  }
};

/**
 * @desc    Get a single college with all its cutoffs and details (A to Z)
 * @route   GET /api/admin/colleges/:id/full-details
 * @access  Private/Admin
 */
const getCollegeFullDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch College Basic Info
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }

    // 2. Fetch all Cutoffs for this college
    const cutoffs = await Cutoff.find({ collegeId: id }).sort({ year: -1, round: 1 });

    // 3. Optional: Group cutoffs by course for cleaner UI consumption
    const courseMatrix = {};
    cutoffs.forEach(c => {
      if (!courseMatrix[c.course]) courseMatrix[c.course] = [];
      courseMatrix[c.course].push(c);
    });

    res.status(200).json({
      success: true,
      data: {
        college,
        cutoffs, // Flat list
        courseMatrix, // Grouped by course name
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Fetch Full Details Error: ${error.message}`);
  }
};

module.exports = {
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
};
