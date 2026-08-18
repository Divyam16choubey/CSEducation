const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// ── Security Headers ──
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ── CORS Configuration ──
// Allows configured frontend domain(s) or defaults to local development
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server health checks)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error("Blocked by CORS policy: origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body Parser with Payload Limit ──
app.use(express.json({ limit: "50kb" }));

// ── General Rate Limiting ──
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});
app.use("/api/", generalLimiter);

// ── Database Connection ──
connectDB();

// ── Health Check ──
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CSEducation Backend API Running",
    environment: process.env.NODE_ENV || "development",
  });
});

// ── API Routes ──
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));

// ── 404 Route Handler ──
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Centralized Error Handler ──
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
