const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const createUploader = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName, // 👈 dynamic folder
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 800, height: 600, crop: "limit" }],
    },
  });

  return multer({ storage });
};

module.exports = createUploader;
