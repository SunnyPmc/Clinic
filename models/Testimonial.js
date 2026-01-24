const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    quote: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt = posted time
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
