const CarouselImage = require("../models/CarouselImage");

// CREATE carousel image (Admin)
exports.addCarouselImage = async (req, res) => {
  try {
    console.log("req.file:", req.file);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    const carouselImage = await CarouselImage.create({
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json(carouselImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET all carousel images (Public)
exports.getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE carousel image (Admin)
exports.deleteCarouselImage = async (req, res) => {
  try {
    const image = await CarouselImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Carousel image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
