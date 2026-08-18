const mongoose = require("mongoose");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const Resource = require("../models/Resource");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const URL_REGEX = /^https?:\/\/.+/i;

const VALID_RESOURCE_TYPES = ["notes", "teacher-notes", "books", "pyqs", "reference"];

// ── Semesters ──

exports.getSemesters = async (req, res, next) => {
  try {
    const semesters = await Semester.find().sort({ number: 1 });
    res.json(semesters);
  } catch (error) {
    next(error);
  }
};

exports.addSemester = async (req, res, next) => {
  try {
    let { number, name } = req.body;
    number = Number(number);

    if (!number || isNaN(number) || number < 1 || number > 8) {
      return res.status(400).json({ success: false, message: "Semester number must be an integer between 1 and 8" });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 50) {
      return res.status(400).json({ success: false, message: "Semester name is required (max 50 characters)" });
    }

    name = name.trim();

    const existing = await Semester.findOne({ number });
    if (existing) {
      return res.status(400).json({ success: false, message: `Semester ${number} already exists` });
    }

    const semester = await Semester.create({ number, name });
    res.status(201).json(semester);
  } catch (error) {
    next(error);
  }
};

// ── Subjects ──

exports.getSubjects = async (req, res, next) => {
  try {
    const semester = Number(req.params.semester);
    if (isNaN(semester) || semester < 1 || semester > 8) {
      return res.status(400).json({ success: false, message: "Invalid semester number (must be 1-8)" });
    }

    // Supports both semesterNumber (schema) and legacy queries
    const subjects = await Subject.find({
      $or: [{ semesterNumber: semester }, { semester: semester }],
    }).sort({ subjectName: 1, name: 1 });

    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

exports.addSubject = async (req, res, next) => {
  try {
    const { name, type, semester, subjectName, semesterNumber, subjectSlug, subjectType } = req.body;

    const finalName = (subjectName || name || "").trim();
    const finalSemester = Number(semesterNumber || semester);
    const finalType = (subjectType || type || "theory").toLowerCase();
    let finalSlug = (subjectSlug || "").trim();

    if (!finalName || finalName.length < 2 || finalName.length > 100) {
      return res.status(400).json({ success: false, message: "Subject name must be between 2 and 100 characters" });
    }

    if (isNaN(finalSemester) || finalSemester < 1 || finalSemester > 8) {
      return res.status(400).json({ success: false, message: "Semester number must be between 1 and 8" });
    }

    if (!["theory", "lab", "project", "elective"].includes(finalType)) {
      return res.status(400).json({ success: false, message: "Invalid subject type (theory, lab, project, elective)" });
    }

    if (!finalSlug) {
      finalSlug = finalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    const existing = await Subject.findOne({ subjectSlug: finalSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: "A subject with this slug or name already exists" });
    }

    const subject = await Subject.create({
      semesterNumber: finalSemester,
      subjectName: finalName,
      subjectSlug: finalSlug,
      subjectType: finalType,
    });

    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

// ── Resources ──

exports.getResources = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    if (!subjectId || typeof subjectId !== "string" || subjectId.length > 100) {
      return res.status(400).json({ success: false, message: "Invalid subject identifier" });
    }

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
    next(error);
  }
};

exports.addResource = async (req, res, next) => {
  try {
    let { title, description, type, url, subject, semester, year } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Resource title is required" });
    }
    title = title.trim();
    if (title.length > 200) {
      return res.status(400).json({ success: false, message: "Title must not exceed 200 characters" });
    }

    if (!type || !VALID_RESOURCE_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Resource type must be one of: ${VALID_RESOURCE_TYPES.join(", ")}`,
      });
    }

    if (!url || typeof url !== "string" || !URL_REGEX.test(url.trim()) || url.trim().length > 2000) {
      return res.status(400).json({ success: false, message: "Valid resource URL (http/https) is required" });
    }
    url = url.trim();

    description = description && typeof description === "string" ? description.trim().slice(0, 1000) : "";
    subject = subject && typeof subject === "string" ? subject.trim().slice(0, 100) : "";

    const resourceData = {
      title,
      description,
      type,
      url,
      subject,
    };

    if (semester !== undefined && semester !== null && semester !== "") {
      const semNum = Number(semester);
      if (!isNaN(semNum) && semNum >= 1 && semNum <= 8) {
        resourceData.semester = semNum;
      }
    }

    if (year !== undefined && year !== null && year !== "") {
      const yearNum = Number(year);
      if (!isNaN(yearNum) && yearNum >= 1990 && yearNum <= 2100) {
        resourceData.year = yearNum;
      }
    }

    const resource = await Resource.create(resourceData);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

// ── Update Resource ──

exports.updateResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid resource ID format" });
    }

    const { title, description, type, url } = req.body;

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0 || title.trim().length > 200) {
        return res.status(400).json({ success: false, message: "Title must be between 1 and 200 characters" });
      }
      resource.title = title.trim();
    }

    if (description !== undefined) {
      resource.description = typeof description === "string" ? description.trim().slice(0, 1000) : "";
    }

    if (type !== undefined) {
      if (!VALID_RESOURCE_TYPES.includes(type)) {
        return res.status(400).json({
          success: false,
          message: `Type must be one of: ${VALID_RESOURCE_TYPES.join(", ")}`,
        });
      }
      resource.type = type;
    }

    if (url !== undefined) {
      if (typeof url !== "string" || !URL_REGEX.test(url.trim()) || url.trim().length > 2000) {
        return res.status(400).json({ success: false, message: "Valid URL (http/https) is required" });
      }
      resource.url = url.trim();
    }

    await resource.save();
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

// ── Delete Resource ──

exports.deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid resource ID format" });
    }

    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }
    res.json({ success: true, message: "Resource deleted" });
  } catch (error) {
    next(error);
  }
};

// ── PYQs ──

exports.getPYQYears = async (req, res, next) => {
  try {
    const years = await Resource.distinct("year", { type: "pyqs" });
    res.json(years.filter(Boolean).sort((a, b) => b - a));
  } catch (error) {
    next(error);
  }
};

exports.getPYQs = async (req, res, next) => {
  try {
    const year = Number(req.params.year);
    if (isNaN(year) || year < 1990 || year > 2100) {
      return res.status(400).json({ success: false, message: "Invalid PYQ year" });
    }

    const pyqs = await Resource.find({ type: "pyqs", year }).sort({
      semester: 1,
      title: 1,
    });
    res.json(pyqs);
  } catch (error) {
    next(error);
  }
};
