const Blog = require("../models/Blog");



exports.createBlog = async (req, res) => {
  try {
    console.log("req.file:", req.file); // Should contain Cloudinary URL
    const { title, description } = req.body;

    if (!req.file?.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    const blog = await Blog.create({
      title,
      description,
      image: req.file.path, // Full Cloudinary URL
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// GET all blogs (Public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD comment to blog
exports.addComment = async (req, res) => {
  try {
    const { name, message } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({ name, message });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// DELETE blog (Admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne(); // remove the blog
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};