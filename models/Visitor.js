const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    googleId: String,
    email: String,
    name: String,
    provider: { type: String, default: "google" },
    firstVisitAt: { type: Date, default: Date.now },
    lastVisitAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
