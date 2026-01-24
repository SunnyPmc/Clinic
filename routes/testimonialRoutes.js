const express = require("express");
const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

// Testimonial APIs
router.post("/", createTestimonial);        // Admin
router.get("/", getTestimonials);           // Public
router.get("/:id", getTestimonialById);     // Public
router.delete("/:id", deleteTestimonial);   // Admin

module.exports = router;
