const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Resource = require("../models/Resource");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ── Semesters ──

exports.getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find().sort({ number: 1 });
        res.json(semesters);
    } catch (error) {
        console.error("getSemesters error:", error.message);
        res.status(500).json({ message: "Failed to fetch semesters" });
    }
};

exports.addSemester = async (req, res) => {
    try {
        const { number, name } = req.body;

        const existing = await Semester.findOne({ number });
        if (existing) {
            return res.status(400).json({ message: "Semester already exists" });
        }

        const semester = await Semester.create({ number, name });
        res.status(201).json(semester);
    } catch (error) {
        console.error("addSemester error:", error.message);
        res.status(500).json({ message: "Failed to add semester" });
    }
};

// ── Subjects ──

exports.getSubjects = async (req, res) => {
    try {
        const semester = Number(req.params.semester);
        const subjects = await Subject.find({ semester }).sort({ name: 1 });
        res.json(subjects);
    } catch (error) {
        console.error("getSubjects error:", error.message);
        res.status(500).json({ message: "Failed to fetch subjects" });
    }
};

exports.addSubject = async (req, res) => {
    try {
        const { name, type, semester } = req.body;
        const subject = await Subject.create({ name, type, semester });
        res.status(201).json(subject);
    } catch (error) {
        console.error("addSubject error:", error.message);
        res.status(500).json({ message: "Failed to add subject" });
    }
};

// ── Resources ──

exports.getResources = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const subjectName = subjectId.replace(/-/g, " ");
        const resources = await Resource.find({
            $or: [
                { subject: new RegExp(`^${escapeRegex(subjectId)}$`, "i") },
                { subject: new RegExp(`^${escapeRegex(subjectName)}$`, "i") },
            ],
        }).sort({
            type: 1,
            title: 1,
        });
        res.json(resources);
    } catch (error) {
        console.error("getResources error:", error.message);
        res.status(500).json({ message: "Failed to fetch resources" });
    }
};

exports.addResource = async (req, res) => {
    try {
        const { title, description, type, url, subject, semester, year } = req.body;
        const resource = await Resource.create({
            title,
            description,
            type,
            url,
            subject,
            semester,
            year,
        });
        res.status(201).json(resource);
    } catch (error) {
        console.error("addResource error:", error.message);
        res.status(500).json({ message: "Failed to add resource" });
    }
};

// ── Update Resource ──

exports.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, type, url } = req.body;

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        if (title !== undefined) resource.title = title;
        if (description !== undefined) resource.description = description;
        if (type !== undefined) resource.type = type;
        if (url !== undefined) resource.url = url;

        await resource.save();
        res.json(resource);
    } catch (error) {
        console.error("updateResource error:", error.message);
        res.status(500).json({ message: "Failed to update resource" });
    }
};

// ── Delete Resource ──

exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndDelete(id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        res.json({ success: true, message: "Resource deleted" });
    } catch (error) {
        console.error("deleteResource error:", error.message);
        res.status(500).json({ message: "Failed to delete resource" });
    }
};

// ── PYQs ──

exports.getPYQYears = async (req, res) => {
    try {
        const years = await Resource.distinct("year", { type: "pyqs" });
        res.json(years.sort((a, b) => b - a));
    } catch (error) {
        console.error("getPYQYears error:", error.message);
        res.status(500).json({ message: "Failed to fetch PYQ years" });
    }
};

exports.getPYQs = async (req, res) => {
    try {
        const year = Number(req.params.year);
        const pyqs = await Resource.find({ type: "pyqs", year }).sort({
            semester: 1,
            title: 1,
        });
        res.json(pyqs);
    } catch (error) {
        console.error("getPYQs error:", error.message);
        res.status(500).json({ message: "Failed to fetch PYQs" });
    }
};
