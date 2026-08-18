const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register admin (requires existing admin authorization)
exports.registerAdmin = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (!username || typeof username !== "string" || !password || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    username = username.trim();
    if (username.length < 3 || username.length > 50) {
      return res.status(400).json({ success: false, message: "Username must be between 3 and 50 characters" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login admin
exports.loginAdmin = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (!username || typeof username !== "string" || !password || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    username = username.trim();

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment variables!");
      return res.status(500).json({ success: false, message: "Authentication service misconfigured" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
