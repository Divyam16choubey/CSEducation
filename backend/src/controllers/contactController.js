const Contact = require("../models/Contact");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.submitContact = async (req, res, next) => {
  try {
    let { name, email, message } = req.body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !message || typeof message !== "string") {
      return res.status(400).json({ success: false, message: "All fields (name, email, message) are required" });
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    message = message.trim();

    if (name.length < 1 || name.length > 100) {
      return res.status(400).json({ success: false, message: "Name must be between 1 and 100 characters" });
    }

    if (!EMAIL_REGEX.test(email) || email.length > 100) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (message.length < 5 || message.length > 2000) {
      return res.status(400).json({ success: false, message: "Message must be between 5 and 2000 characters" });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message sent successfully", contact });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};
