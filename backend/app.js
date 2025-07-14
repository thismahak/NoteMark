const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const { authRateLimiter, globalLimiter } = require('./middleware/rateLimiter');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

dotenv.config();

const noteRoutes = require("./routes/notes");
const bookmarkRoutes = require("./routes/bookmarks");
const authRoutes = require("./routes/auth");

const app = express();

// === 🛡️ Middlewares ===
app.use(helmet()); // for setting secure HTTP headers
app.use(morgan("dev")); // logging
app.use(cors({
  origin:["http://localhost:3000", "https://note-mark-nu.vercel.app/"],
  credentials: true
}));
app.use(express.json()); // JSON body parser
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());
app.use(globalLimiter);


// === 📦 Database Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// === 🚦 Routes ===
app.use("/api/notes", noteRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🎉 Notes & Bookmark Manager API is running");
});

// === 🧯 404 Handler ===
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
