const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Commented item id is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Commentator user id is required"],
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
