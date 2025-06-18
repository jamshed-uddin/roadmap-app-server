const mongoose = require("mongoose");

const upvoteSchema = new mongoose.Schema(
  {
    upvoteTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Upvoted item id is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Upvoter user id is required"],
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const Upvote = mongoose.models.Upvote || mongoose.model("Upvote", upvoteSchema);

module.exports = Upvote;
