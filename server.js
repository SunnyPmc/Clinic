const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./config/passport"); // import passport config
const userAuthRoutes = require("./routes/userAuthRoutes")

const uploadRoutes = require("./routes/uploadRoutes");
const blogRoutes = require("./routes/blogRoutes")
const testimonialRoutes = require("./routes/testimonialRoutes")
const therapyMaterialRoutes = require("./routes/therapyMaterialRoutes")
const authRoutes = require("./routes/authRoutes");
const carouselRoutes = require("./routes/carouselRoutes");

const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kathmanduhearingandspeech.com",
      "https://www.kathmanduhearingandspeech.com",
      "https://admin.kathmanduhearingandspeech.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  cookieSession({
    name: "visitor-session",
    keys: ["secretKey"], // use .env in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Uploads folder for images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"), {
  setHeaders: (res, path, stat) => {
    res.set("Access-Control-Allow-Origin", "*"); // allow frontend to access images
  },
}));

// -------------------------
// API routes (register first!)
// -------------------------
app.use("/api/upload", uploadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/materials", therapyMaterialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/auth", userAuthRoutes);




app.listen(port, () => console.log(`Server running on port ${port}`))
