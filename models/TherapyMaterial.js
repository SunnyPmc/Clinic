const mongoose = require("mongoose");

const therapyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true, // e.g. Speech, Hearing, Occupational
    },

    image: {
      type: String, // image URL
    },

    link: {
      type: String, // external or internal resource link
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("TherapyMaterial", therapyMaterialSchema);
