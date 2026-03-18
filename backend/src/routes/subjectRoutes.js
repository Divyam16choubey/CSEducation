const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    createOrUpdateSubject,
    getSubjectsBySemester,
    getSubjectBySlug,
    deleteSubject,
} = require("../controllers/subjectController");

// POST   /api/subjects          (admin only)
router.post("/", auth, createOrUpdateSubject);

// GET    /api/subjects/semester/:semesterNumber
router.get("/semester/:semesterNumber", getSubjectsBySemester);

// GET    /api/subjects/slug/:slug
router.get("/slug/:slug", getSubjectBySlug);

// DELETE /api/subjects/:id      (admin only)
router.delete("/:id", auth, deleteSubject);

module.exports = router;
