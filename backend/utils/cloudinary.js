const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'admission-expert/colleges' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });
};

module.exports = { cloudinary, uploadImage };
