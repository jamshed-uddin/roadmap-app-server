const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User id is required"],
    ref: "User",
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Roadmap id is required"],
    ref: "Roadmap",
  },

  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoadmapItem",
  },
  status: {
    type: String,
    enum: ["inProgress", "complete"],
    required: [true, "Progress status is required"],
  },
});

const Progress =
  mongoose.models.Progress || mongoose.model("Progress", progressSchema);

module.exports = Progress;
