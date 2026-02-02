const TherapyMaterial = require("../models/TherapyMaterial");


// CREATE material (Admin)
exports.createMaterial = async (req, res) => {
  try {
    // Make sure Multer middleware is used in your route:
    // router.post("/", upload.single("image"), createMaterial);

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { title, description, category, link } = req.body;

    const material = await TherapyMaterial.create({
      title,
      description,
      category,
      link,
      image: `uploads/images/${req.file.filename}`, // NO leading slash!
    });

    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// GET all materials (Public)
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await TherapyMaterial.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET material by ID (Public)
exports.getMaterialById = async (req, res) => {
  try {
    const material = await TherapyMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET materials by category (Public)
exports.getMaterialsByCategory = async (req, res) => {
  try {
    const materials = await TherapyMaterial.find({
      category: req.params.category,
    });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE material (Admin)
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await TherapyMaterial.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.json({ message: "Material deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
