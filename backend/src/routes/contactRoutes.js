const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../middleware/authMiddleware");

const {
  submitContact,
  getContacts,
} = require("../controllers/contactController");

// Rate limiter for public contact submissions to prevent form spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 messages per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages sent. Please wait before submitting again." },
});

// Public – submit a contact message
router.post("/", contactLimiter, submitContact);

// Admin – view all contact messages
router.get("/", auth, getContacts);

module.exports = router;
