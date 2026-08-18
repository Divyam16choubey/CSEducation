const mongoose = require("mongoose");
const Subject = require("../models/Subject");

const URL_REGEX = /^https?:\/\/.+/i;

const sanitizeStringArray = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => typeof item === "string" && URL_REGEX.test(item.trim()))
    .map((item) => item.trim().slice(0, 2000));
};

const sanitizeReferenceLinks = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => item && typeof item === "object" && typeof item.title === "string" && typeof item.url === "string" && URL_REGEX.test(item.url.trim()))
    .map((item) => ({
      title: item.title.trim().slice(0, 200),
      url: item.url.trim().slice(0, 2000),
    }));
};

// ── Create or Update Subject ──
exports.createOrUpdateSubject = async (req, res, next) => {
  try {
    let {
      semesterNumber,
      subjectName,
      subjectSlug,
      subjectType,
      notesLinks,
      teacherNotesLinks,
      pyqLinks,
      bookLinks,
      referenceLinks,
    } = req.body;

    semesterNumber = Number(semesterNumber);
    if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
      return res.status(400).json({ success: false, message: "Semester number must be an integer between 1 and 8" });
    }

    if (!subjectName || typeof subjectName !== "string" || subjectName.trim().length < 2 || subjectName.trim().length > 100) {
      return res.status(400).json({ success: false, message: "Subject name must be between 2 and 100 characters" });
    }
    subjectName = subjectName.trim();

    if (!subjectSlug || typeof subjectSlug !== "string" || subjectSlug.trim().length === 0) {
      subjectSlug = subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    } else {
      subjectSlug = subjectSlug.trim().toLowerCase();
    }

    subjectType = (subjectType || "theory").toLowerCase();
    if (!["theory", "lab", "project", "elective"].includes(subjectType)) {
      return res.status(400).json({ success: false, message: "Invalid subject type" });
    }

    const cleanNotes = sanitizeStringArray(notesLinks);
    const cleanTeacherNotes = sanitizeStringArray(teacherNotesLinks);
    const cleanPyqs = sanitizeStringArray(pyqLinks);
    const cleanBooks = sanitizeStringArray(bookLinks);
    const cleanRefs = sanitizeReferenceLinks(referenceLinks);

    let subject = await Subject.findOne({ subjectSlug });

    if (subject) {
      // Append sanitized links without duplicating
      if (cleanNotes.length > 0) subject.notesLinks.push(...cleanNotes);
      if (cleanTeacherNotes.length > 0) subject.teacherNotesLinks.push(...cleanTeacherNotes);
      if (cleanPyqs.length > 0) subject.pyqLinks.push(...cleanPyqs);
      if (cleanBooks.length > 0) subject.bookLinks.push(...cleanBooks);
      if (cleanRefs.length > 0) subject.referenceLinks.push(...cleanRefs);

      await subject.save();
      return res.json({ success: true, message: "Subject updated", subject });
    }

    // Create new subject
    subject = await Subject.create({
      semesterNumber,
      subjectName,
      subjectSlug,
      subjectType,
      notesLinks: cleanNotes,
      teacherNotesLinks: cleanTeacherNotes,
      pyqLinks: cleanPyqs,
      bookLinks: cleanBooks,
      referenceLinks: cleanRefs,
    });

    res.status(201).json({ success: true, message: "Subject created", subject });
  } catch (error) {
    next(error);
  }
};

// ── Get Subjects by Semester ──
exports.getSubjectsBySemester = async (req, res, next) => {
  try {
    const semesterNumber = Number(req.params.semesterNumber);
    if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
      return res.status(400).json({ success: false, message: "Invalid semester number (must be 1-8)" });
    }

    const subjects = await Subject.find({ semesterNumber }).sort({
      subjectName: 1,
    });
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

// ── Get Subject by Slug ──
exports.getSubjectBySlug = async (req, res, next) => {
  try {
    const slug = (req.params.slug || "").trim().toLowerCase();
    if (!slug || slug.length > 100) {
      return res.status(400).json({ success: false, message: "Invalid subject slug" });
    }

    const subject = await Subject.findOne({ subjectSlug: slug });

    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    res.json(subject);
  } catch (error) {
    next(error);
  }
};

// ── Delete Subject ──
exports.deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid subject ID format" });
    }

    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.json({ success: true, message: "Subject deleted" });
  } catch (error) {
    next(error);
  }
};
