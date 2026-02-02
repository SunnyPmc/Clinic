const express = require("express");
const upload = require("../middleware/upload");
const {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  getMaterialsByCategory,
  deleteMaterial,
} = require("../controllers/therapyMaterialController");

const router = express.Router();

// Therapy Material APIs
router.post("/", upload.single("image"), createMaterial);                // Admin
router.get("/", getAllMaterials);                 // Public
router.get("/category/:category", getMaterialsByCategory);
router.get("/:id", getMaterialById);              // Public
router.delete("/:id", deleteMaterial);            // Admin

module.exports = router;
