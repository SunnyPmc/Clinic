const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const url = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;

  res.status(200).json({ url });
});

module.exports = router;
