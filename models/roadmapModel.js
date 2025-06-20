const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap =
  mongoose.models.Roadmap || mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;
