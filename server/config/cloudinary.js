const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  console.log("ENV CHECK:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: process.env.COURSE_FOLDER,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,       // ✅ MUST EXIST
    api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ MUST EXIST
  });

  console.log("Cloudinary connected successfully");
};
