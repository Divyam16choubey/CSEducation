const Subject = require("../models/Subject");

// ── Create or Update Subject ──
// If subject with given slug exists, push new links into arrays.
// If not, create a new document.
exports.createOrUpdateSubject = async (req, res) => {
    try {
        const {
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

        let subject = await Subject.findOne({ subjectSlug });

        if (subject) {
            // Push new links into existing arrays
            if (notesLinks && notesLinks.length > 0)
                subject.notesLinks.push(...notesLinks);
            if (teacherNotesLinks && teacherNotesLinks.length > 0)
                subject.teacherNotesLinks.push(...teacherNotesLinks);
            if (pyqLinks && pyqLinks.length > 0)
                subject.pyqLinks.push(...pyqLinks);
            if (bookLinks && bookLinks.length > 0)
                subject.bookLinks.push(...bookLinks);
            if (referenceLinks && referenceLinks.length > 0)
                subject.referenceLinks.push(...referenceLinks);

            await subject.save();
            return res.json({ success: true, message: "Subject updated", subject });
        }

        // Create new subject
        subject = await Subject.create({
            semesterNumber,
            subjectName,
            subjectSlug,
            subjectType: subjectType || "theory",
            notesLinks: notesLinks || [],
            teacherNotesLinks: teacherNotesLinks || [],
            pyqLinks: pyqLinks || [],
            bookLinks: bookLinks || [],
            referenceLinks: referenceLinks || [],
        });

        res.status(201).json({ success: true, message: "Subject created", subject });
    } catch (error) {
        console.error("createOrUpdateSubject error:", error.message);
        res.status(500).json({ message: "Failed to save subject" });
    }
};

// ── Get Subjects by Semester ──
exports.getSubjectsBySemester = async (req, res) => {
    try {
        const semesterNumber = Number(req.params.semesterNumber);
        const subjects = await Subject.find({ semesterNumber }).sort({
            subjectName: 1,
        });
        res.json(subjects);
    } catch (error) {
        console.error("getSubjectsBySemester error:", error.message);
        res.status(500).json({ message: "Failed to fetch subjects" });
    }
};

// ── Get Subject by Slug ──
exports.getSubjectBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const subject = await Subject.findOne({ subjectSlug: slug });

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.json(subject);
    } catch (error) {
        console.error("getSubjectBySlug error:", error.message);
        res.status(500).json({ message: "Failed to fetch subject" });
    }
};

// ── Delete Subject ──
exports.deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await Subject.findByIdAndDelete(id);
        res.json({ success: true, message: "Subject deleted" });
    } catch (error) {
        console.error("deleteSubject error:", error.message);
        res.status(500).json({ message: "Failed to delete subject" });
    }
};
