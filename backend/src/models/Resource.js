const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["notes", "teacher-notes", "books", "pyqs", "reference"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: "",
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
    year: {
      type: Number, // for PYQs – e.g. 2024
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
