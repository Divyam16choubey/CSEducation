const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    submitContact,
    getContacts,
} = require("../controllers/contactController");

// Public – submit a contact message
router.post("/", submitContact);

// Admin – view all contact messages
router.get("/", auth, getContacts);

module.exports = router;
