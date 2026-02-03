const express = require("express");
const upload = require("../middleware/upload"); // cloudinary multer
const {
  addCarouselImage,
  getCarouselImages,
  deleteCarouselImage,
} = require("../controllers/carouselController");

const router = express.Router();

// Admin
router.post("/", upload.single("image"), addCarouselImage);
router.delete("/:id", deleteCarouselImage);

// Public
router.get("/", getCarouselImages);

module.exports = router;
