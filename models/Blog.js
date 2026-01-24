const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
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

    image: {
      type: String, // image URL
    },

    comments: [commentSchema], // embedded comments
  },
  {
    timestamps: true, // adds createdAt (posted time) & updatedAt
  }
);

module.exports = mongoose.model("Blog", blogSchema);
