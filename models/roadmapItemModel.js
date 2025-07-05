const mongoose = require("mongoose");

const RoadmapItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["topic", "subtopic"],
      default: "topic",
    },
    roadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Item's roadmap id is required"],
      ref: "Roadmap",
    },
    subtopicTo: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const RoadmapItem =
  mongoose.models.RoadmapItem ||
  mongoose.model("RoadmapItem", RoadmapItemSchema);

module.exports = RoadmapItem;
