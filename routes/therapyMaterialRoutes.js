const express = require("express");
const upload = require("../middleware/upload"); // multer middleware
const createUploader = require("../middleware/uploadCloudinary")
const uploadTherapy = createUploader("therapy_materials");
const {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  getMaterialsByCategory,
  deleteMaterial,
} = require("../controllers/therapyMaterialController");

const router = express.Router();

// Therapy Material APIs
// router.post("/", upload.single("image"), createMaterial); // Admin
router.post(
  "/",
  uploadTherapy.single("image"),
  createMaterial
);
router.get("/", getAllMaterials); // Public
router.get("/category/:category", getMaterialsByCategory); // Public
router.get("/:id", getMaterialById); // Public
router.delete("/:id", deleteMaterial); // Admin

module.exports = router;
