const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController");

// create admin (first time only)
router.post("/register", registerAdmin);

// login admin
router.post("/login", loginAdmin);

module.exports = router;
