const Blog = require("../models/Blog");

// CREATE blog (Admin)
// exports.createBlog = async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.createBlog = async (req, res) => {
  try {
    // const { title, description } = req.body;

    // const blog = await Blog.create({
    //   title,
    //   description,
    //   image: `uploads/images/${req.file.filename}`,
    // });
    const imagePath = `uploads/images/${req.file.filename}`;

    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      image: imagePath,
    });
    // console.log(req.body);
    // console.log(req.file);

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
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