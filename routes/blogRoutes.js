const express = require("express");

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  addComment,
} = require("../controllers/blogController");

const router = express.Router();

// Blog APIs
router.post("/", createBlog);              // Admin
router.get("/", getAllBlogs);               // Public
router.get("/:id", getBlogById);            // Public
router.post("/:id/comments", addComment);   // Public

module.exports = router;
