const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/authController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Admin login route
router.post("/login", adminLogin);

// Example protected dashboard route
router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.email}!` });
});

module.exports = router;