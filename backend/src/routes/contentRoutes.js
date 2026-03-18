const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    getSemesters,
    addSemester,
    getSubjects,
    addSubject,
    getResources,
    addResource,
    getPYQYears,
    getPYQs,
} = require("../controllers/contentController");

// ── Semesters ──
router.get("/semesters", getSemesters);
router.post("/semesters", auth, addSemester);

// ── Subjects ──
router.get("/subjects/:semester", getSubjects);
router.post("/subjects", auth, addSubject);

// ── Resources ──
router.get("/resources/:subjectId", getResources);
router.post("/resources", auth, addResource);

// ── PYQs ──
router.get("/pyqs/years", getPYQYears);
router.get("/pyqs/:year", getPYQs);
router.post("/pyqs", auth, addResource); // PYQs are resources with type "pyqs"

module.exports = router;
