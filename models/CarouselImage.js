const mongoose = require("mongoose");

const carouselImageSchema = new mongoose.Schema(
  {
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarouselImage", carouselImageSchema);
