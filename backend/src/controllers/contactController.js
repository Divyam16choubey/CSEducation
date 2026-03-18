const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contact = await Contact.create({ name, email, message });
        res.status(201).json({ message: "Message sent successfully", contact });
    } catch (error) {
        console.error("submitContact error:", error.message);
        res.status(500).json({ message: "Failed to send message" });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error("getContacts error:", error.message);
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
};
