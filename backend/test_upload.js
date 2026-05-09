const axios = require('axios');
const FormData = require('form-data');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

async function testUpload() {
  const data = [
    {
      "College": "IIT Bombay", // Exists in user DB
      "Exam": "JEE Advanced",
      "Year": 2024,
      "Round": "1",
      "Course": "Computer Science",
      "Branch": "CSE",
      "Category": "General",
      "Seats": 100,
      "Opening Rank": 1,
      "Closing Rank": 50
    }
  ];

  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Test");
  
  const filePath = path.join(__dirname, 'Test_Upload.xlsx');
  xlsx.writeFile(wb, filePath);

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    console.log("Sending test upload to http://localhost:5000/api/admin/upload-cutoffs ...");
    const response = await axios.post('http://localhost:5000/api/admin/upload-cutoffs', formData, {
      headers: formData.getHeaders()
    });
    console.log("RESPONSE:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("UPLOAD_ERROR:", error.response ? error.response.data : error.message);
  } finally {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}

testUpload();
