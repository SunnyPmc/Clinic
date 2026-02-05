const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1️⃣ Find user with role ADMIN
    const user = await User.findOne({ email, role: "ADMIN" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2️⃣ Compare password (hashed)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3️⃣ Generate JWT
    const expiresIn = Number(process.env.JWT_EXPIRES_IN); // convert to number
    if (!process.env.JWT_SECRET || !expiresIn) {
      return res.status(500).json({ message: "JWT secret or expiresIn not configured" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn } // number of seconds
    );

    // 4️⃣ Send token + user info
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};