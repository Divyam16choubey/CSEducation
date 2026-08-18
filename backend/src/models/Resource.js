const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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

// Indexes for query performance
resourceSchema.index({ type: 1, year: 1 });
resourceSchema.index({ subject: 1, type: 1 });
resourceSchema.index({ semester: 1 });

module.exports = mongoose.model("Resource", resourceSchema);
