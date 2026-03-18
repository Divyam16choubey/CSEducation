const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectSlug: {
    type: String,
    required: true,
    unique: true,
  },
  subjectType: {
    type: String,
    enum: ["theory", "lab", "project", "elective"],
    default: "theory",
  },

  notesLinks: [String],
  teacherNotesLinks: [String],
  pyqLinks: [String],
  bookLinks: [String],

  referenceLinks: [
    {
      title: { type: String },
      url: { type: String },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
