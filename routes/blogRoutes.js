const express = require("express");
const upload = require("../middleware/upload")

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  addComment,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Blog APIs
// router.post("/", createBlog);
router.post("/", upload.single("image"), createBlog);              // Admin
router.get("/", getAllBlogs);               // Public
router.get("/:id", getBlogById);            // Public
router.post("/:id/comments", addComment);   // Public
router.delete("/:id", deleteBlog);   // Public

module.exports = router;
