const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../middleware/authMiddleware");

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController");

// Strict rate limiter for authentication endpoints to prevent brute-forcing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts, please try again in 15 minutes" },
});

// Create admin — requires existing admin token.
// For initial bootstrapping, use the CLI script: npm run create-admin <user> <pass>
router.post("/register", authLimiter, auth, registerAdmin);

// Login admin
router.post("/login", authLimiter, loginAdmin);

module.exports = router;
