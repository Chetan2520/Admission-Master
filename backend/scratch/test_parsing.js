const getVal = (row, keys) => {
  if (!row) return null;
  const normalize = (s) => (s ? s.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, "") : "");
  const normalizedKeys = keys.map(normalize);
  const foundKey = Object.keys(row).find((k) => normalizedKeys.includes(normalize(k)));
  return foundKey ? row[foundKey] : null;
};

const row = {
  "college_name": "All India Institute of Medical Sciences Bhopal",
  "short_name": "AIIMS Bhopal",
  "course": "MBBS",
  "branch": "General Medicine",
  "duration_years": 5.5,
  "fees": 1628,
  "description": "Premier central govt MBBS; NEET UG All India quota"
};

console.log("College Name:", getVal(row, ["college", "collegename", "college_name", "shortname", "college_short_name", "collegeshortname", "name", "institution"]));
console.log("Course:", getVal(row, ["course", "coursename", "degree", "program", "course_name"]));
console.log("Branch:", getVal(row, ["branch", "branches", "stream", "specialization", "discipline", "branch_name"]));
console.log("Duration:", getVal(row, ["duration", "durations", "course-duration", "years", "duration_years"]));
console.log("Fees:", getVal(row, ["fees", "fees-per-year", "average-fees", "course-fees", "fee"]));

const feesRaw = 0;
console.log("Fees (if 0):", feesRaw || "N/A");
