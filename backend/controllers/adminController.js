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

    const getVal = (row, keys) => {
      if (!row) return null;
      const normalize = (s) => (s ? s.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "") : "");
      const normalizedKeys = keys.map(normalize);
      const foundKey = Object.keys(row).find((k) => normalizedKeys.includes(normalize(k)));
      return foundKey ? row[foundKey] : null;
    };

    // Process and validate data
    const processedData = rawData.map((item, index) => {
      const name = getVal(item, ["name", "collegename", "institution", "college"]);
      const location = getVal(item, ["location", "city", "district", "place"]);
      const state = getVal(item, ["state", "province", "region"]);
      const shortName = getVal(item, ["shortname", "short", "abbreviation", "code"]);
      const type = getVal(item, ["type", "collegetype", "category"]) || "Govt";
      const nirfRank = getVal(item, ["nirfrank", "nirf", "ranking","nirfRank"]);
      const fees = getVal(item, ["fees", "averagefees", "coursefees", "averagecoursefees"]);
      const website = getVal(item, ["website", "url", "link", "site"]);
      const affiliatedWith = getVal(item, ["affiliatedwith", "university", "affiliation"]);
      const entranceExams = getVal(item, ["entranceexams", "exams", "entrance"]);

      // Basic validation for required fields
      if (!name || !location || !state) {
        throw new Error(
          `Row ${index + 2} is missing required data. Ensure columns for Name, Location/City, and State exist.`,
        );
      }

      const trimmedName = name.toString().trim();

      return {
        ...item,
        name: trimmedName,
        location: location.toString().trim(),
        state: state.toString().trim(),
        shortName: shortName ? shortName.toString().trim() : undefined,
        type,
        nirfRank,
        averageCourseFees: fees,
        website,
        affiliatedWith,
        entranceExams:
          typeof entranceExams === "string"
            ? entranceExams.split(",").map((s) => s.trim())
            : Array.isArray(entranceExams)
              ? entranceExams
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

    const getVal = (row, keys) => {
      if (!row) return null;
      const normalize = (s) => (s ? s.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "") : "");
      const normalizedKeys = keys.map(normalize);
      const foundKey = Object.keys(row).find((k) => normalizedKeys.includes(normalize(k)));
      return foundKey ? row[foundKey] : null;
    };

    const escapeRegex = (string) => {
      return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
    };

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2;

      // Identify College
      const collegeIdentifier = getVal(row, ["college", "collegename", "college_name", "shortname", "college_short_name", "collegeshortname", "name", "institution"]);

      if (!collegeIdentifier) {
        errorRows.push({
          row: rowNum,
          error: "Missing College Name or Short Name in Excel columns.",
        });
        continue;
      }

      const trimmedIdentifier = collegeIdentifier.toString().trim();
      const escapedIdentifier = escapeRegex(trimmedIdentifier);
      let collegeId = null;
      const cacheKey = trimmedIdentifier.toLowerCase();

      if (collegeCache.has(cacheKey)) {
        collegeId = collegeCache.get(cacheKey);
      } else {
        const college = await College.findOne({
          $or: [
            { shortName: new RegExp(`^\\s*${escapedIdentifier}\\s*$`, "i") },
            { name: new RegExp(`^\\s*${escapedIdentifier}\\s*$`, "i") },
          ],
        });

        if (college) {
          collegeId = college._id;
          collegeCache.set(cacheKey, collegeId);
        }
      }

      if (!collegeId) {
        errorRows.push({
          row: rowNum,
          error: `College "${trimmedIdentifier}" not found. Check 'Manage Colleges' for exact names.`,
        });
        continue;
      }

      const exam = getVal(row, ["exam", "entranceexam", "examname", "entrance", "exam_name"]);
      const year = getVal(row, ["year", "academicyear", "session"]) || new Date().getFullYear();
      const round = getVal(row, ["round", "counselinground", "cround"]) || "1";
      const course = getVal(row, ["course", "coursename", "degree", "program", "course_name"]);
      const branch = getVal(row, ["branch", "stream", "specialization", "discipline", "branch_name"]) || "General";
      const category = getVal(row, ["category", "caste", "reservation", "cat"]);
      const quota = getVal(row, ["quota", "type", "seatquota"]);
      let openingRank = getVal(row, ["openingrank", "opening", "or", "startrank", "rankfrom", "opening_rank"]);
      let closingRank = getVal(row, ["closingrank", "closing", "cr", "endrank", "rankto", "closing_rank"]);
      
      // Support for a single "Ranks" column (e.g., "100-500" or "100 / 500")
      if ((openingRank === null || closingRank === null)) {
        const combinedRanks = getVal(row, ["ranks", "rank", "cutoff", "cutoffs", "cutoff_rank"]);
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

      const seats = getVal(row, ["seats", "seatcount", "intake", "totalinteke"]) || 0;

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
  const { search, exam, year, round, page = 1, limit = 1000 } = req.query;

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

    const normalize = (s) => (s ? s.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "") : "");

    const getVal = (row, keys) => {
      if (!row) return null;
      const normalizedKeys = keys.map(normalize);
      const foundKey = Object.keys(row).find((k) => normalizedKeys.includes(normalize(k)));
      return foundKey ? row[foundKey] : null;
    };

    // 1. Pre-fetch all colleges for robust in-memory matching
    const allColleges = await College.find({});
    const collegeLookup = new Map();
    
    allColleges.forEach(c => {
      const n1 = normalize(c.name);
      const n2 = normalize(c.shortName);
      if (n1) collegeLookup.set(n1, c);
      if (n2) collegeLookup.set(n2, c);
    });

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      // Try multiple columns for college identification
      const collegeNameInRow = getVal(row, ["college_name", "college", "collegename", "name", "institution"]);
      const collegeShortNameInRow = getVal(row, ["short_name", "shortname", "short", "college_short_name", "collegeshortname"]);
      
      const potentialIdentifiers = [collegeNameInRow, collegeShortNameInRow].filter(Boolean);
      
      if (potentialIdentifiers.length === 0) {
        errors.push(`Row ${i + 2}: Missing college name or short name`);
        continue;
      }

      let college = null;
      for (const iden of potentialIdentifiers) {
        const normIden = normalize(iden);
        if (collegeLookup.has(normIden)) {
          college = collegeLookup.get(normIden);
          break;
        }
      }

      if (!college) {
        errors.push(`Row ${i + 2}: College not found in database (Checked: ${potentialIdentifiers.join(", ")})`);
        continue;
      }

      // --- NEW FLEXIBLE PARSING LOGIC ---
      
      // 1. Check for "Dot Serialized Format" (Requested by user)
      // Headers: College Name, Short Name, Courses, Mapping (Course.Branch), Details (Branch.Duration.Fees)
      const mappingRaw = getVal(row, ["mapping", "course.branch", "course-branch"]);
      const detailsRaw = getVal(row, ["details", "branch.details", "branch-details", "branch.duration.fees"]);

      const recordsToProcess = [];

      if (mappingRaw && detailsRaw) {
        console.log(`Row ${i + 2}: Detected Dot Serialized Format`);
        // Parse Dot Serialized Format
        const mappings = mappingRaw.toString().split(",").map(s => s.trim());
        const details = detailsRaw.toString().split(",").map(s => s.trim());

        // Create a map of branch -> {duration, fees}
        const branchInfo = new Map();
        details.forEach(d => {
          const parts = d.split(".");
          if (parts.length >= 2) {
            branchInfo.set(parts[0].trim().toLowerCase(), {
              duration: parts[1]?.trim() || "4 Years",
              fees: parts[2]?.trim() || "N/A"
            });
          }
        });

        // Group by course
        const courseMap = new Map();
        mappings.forEach(m => {
          const parts = m.split(".");
          if (parts.length >= 2) {
            const cName = parts[0].trim();
            const bName = parts[1].trim();
            if (!courseMap.has(cName)) courseMap.set(cName, []);
            courseMap.get(cName).push(bName);
          }
        });

        for (const [cName, branches] of courseMap.entries()) {
          recordsToProcess.push({
            courseName: cName,
            branches: branches,
            durations: branches.map(b => branchInfo.get(b.toLowerCase())?.duration || "4 Years"),
            fees: branches.map(b => branchInfo.get(b.toLowerCase())?.fees || "N/A")
          });
        }
      } 
      // 2. Check for Dynamic Course Columns (e.g., "B.Tech Branches")
      else {
        const dynamicCourses = new Set();
        Object.keys(row).forEach(key => {
          const lowerKey = key.toLowerCase();
          if (lowerKey.endsWith(" branches") || lowerKey.endsWith(" branch")) {
            dynamicCourses.add(key.substring(0, key.lastIndexOf(" ")).trim());
          }
        });

        if (dynamicCourses.size > 0) {
          for (const courseName of dynamicCourses) {
            const branchesRaw = getVal(row, [`${courseName} Branches`, `${courseName} Branch`]);
            const durationsRaw = getVal(row, [`${courseName} Durations`, `${courseName} Duration`, `${courseName} Years`]) || "4 Years";
            const feesRaw = getVal(row, [`${courseName} Fees`, `${courseName} Average Fees`]);
            const descRaw = getVal(row, [`${courseName} Description`, `${courseName} Info`]) || "";

            if (branchesRaw) {
              recordsToProcess.push({
                courseName,
                branches: branchesRaw.toString().split(",").map(s => s.trim()),
                durations: durationsRaw.toString().split(",").map(s => s.trim()),
                fees: (feesRaw !== null && feesRaw !== undefined) ? feesRaw.toString().split(",").map(s => s.trim()) : ["N/A"],
                descriptions: descRaw.toString().split("|").map(s => s.trim())
              });
            }
          }
        } else {
          // 3. Standard or Multi-Branch Format (Approach 1: Flat/Denormalized)
          const courseName = getVal(row, ["course", "coursename", "degree", "program", "course_name"]);
          const branchesRaw = getVal(row, ["branch", "branches", "stream", "specialization", "discipline", "branch_name"]) || "General";
          const durationsRaw = getVal(row, ["duration", "durations", "course-duration", "years", "duration_years"]) || "4 Years";
          const feesRaw = getVal(row, ["fees", "fees-per-year", "average-fees", "course-fees", "fee"]);
          const descriptionRaw = getVal(row, ["description", "branch_description", "details", "info"]) || "";

          if (courseName) {
            recordsToProcess.push({
              courseName,
              branches: branchesRaw.toString().split(",").map(s => s.trim()),
              durations: durationsRaw.toString().split(",").map(s => s.trim()),
              fees: (feesRaw !== null && feesRaw !== undefined) ? feesRaw.toString().split(",").map(s => s.trim()) : ["N/A"],
              descriptions: descriptionRaw.toString().split("|").map(s => s.trim())
            });
          }
        }
      }
      
      if (recordsToProcess.length === 0) {
        console.log(`Row ${i + 2}: No courses found. Row keys: ${Object.keys(row).join(", ")}`);
      }
      console.log(`Row ${i + 2}: Found ${recordsToProcess.length} courses to process`);

      // 2. Process all identified records for this row
      for (const record of recordsToProcess) {
        console.log(`Row ${i + 2}: Processing Course "${record.courseName}" with ${record.branches.length} branches`);
        let course = college.courses.find((c) => c.name.toLowerCase() === record.courseName.toLowerCase().trim());
        if (!course) {
          course = { name: record.courseName.trim(), branches: [] };
          college.courses.push(course);
        }

        // Handle multiple branches in one record
        record.branches.forEach((bName, idx) => {
          if (!bName) return;
          
          let branch = course.branches.find((b) => b.name.toLowerCase() === bName.toLowerCase().trim());
          const duration = record.durations[idx] || record.durations[0] || "4 Years";
          const fees = record.fees[idx] || record.fees[0] || "N/A";
          const description = record.descriptions[idx] || record.descriptions[0] || "";

          if (branch) {
            branch.duration = duration;
            branch.fees = fees;
            branch.description = description;
          } else {
            course.branches.push({ name: bName.trim(), duration, fees, description });
          }
          updatedCount++;
        });
      }
    }

    // Save all modified colleges
    const collegesToSave = Array.from(new Set(allColleges.filter(c => c.isModified())));
    for (const college of collegesToSave) {
      await college.save();
    }

    res.status(200).json({
      success: true,
      updatedCount,
      errors: errors.length > 0 ? errors : null,
      message: `Processed ${updatedCount} course/branch records across ${collegesToSave.length} colleges.`,
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
 * @desc    Get a single college by ID
 * @route   GET /api/admin/colleges/:id
 * @access  Private/Admin
 */
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }
    res.status(200).json({ success: true, data: college });
  } catch (error) {
    res.status(500);
    throw new Error(`Fetch College Error: ${error.message}`);
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
  getCollegeById,
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

