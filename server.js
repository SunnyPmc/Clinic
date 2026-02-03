const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./config/passport"); // import passport config
const uploadRoutes = require("./routes/uploadRoutes");




const blogRoutes = require("./routes/blogRoutes")
const testimonialRoutes = require("./routes/testimonialRoutes")
const therapyMaterialRoutes = require("./routes/therapyMaterialRoutes")
const authRoutes = require("./routes/authRoutes");

const port = process.env.PORT || 8000
const connectDB = require('./config/db')

connectDB()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://kathmanduhearingandspeech.com",
      "https://www.kathmanduhearingandspeech.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Sessions
app.use(
  cookieSession({
    name: "visitor-session",
    keys: ["secretKey"], // use .env in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);
app.use("/api/upload", uploadRoutes);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"), {
  // Add headers to allow cross-origin image loading
  setHeaders: (res, path, stat) => {
    res.set("Access-Control-Allow-Origin", "*"); // or your frontend URL
  },
}));
// Serve frontend static files
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all route to index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/materials", therapyMaterialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carousel", require("./routes/carouselRoutes"));


app.listen(port, () => console.log(`Server running on port ${port}`))