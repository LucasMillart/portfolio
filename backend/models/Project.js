const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    technologies: [String],
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed", "on-hold"],
      default: "in-progress",
    },
    startDate: Date,
    endDate: Date,
    github: String,
    liveUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
