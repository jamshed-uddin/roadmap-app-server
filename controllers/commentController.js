const customError = require("../utils/customError");
const Comments = require("../models/commentModel");

// @desc create comment
// POST /api/comments
// @access Private
const createComment = async (req, res, next) => {
  try {
    const { itemId, content, replyTo } = req.body;
    const userId = req.user?._id;

    if (!itemId || !content) {
      throw customError(400, "Item id and content is required");
    }

    await Comments.create({ itemId, content, userId, replyTo });
    res.status(200).send({ message: "Comment created" });
  } catch (error) {
    next(error);
  }
};

// @desc get comments
// GET /api/comments
// query params - item: string - item is itemId
// @access Public
const getComments = async (req, res, next) => {
  try {
    const itemId = req.query.item;
    if (!itemId) {
      throw customError(400, "Item id is required");
    }

    const comments = await Comments.find({ itemId: itemId })
      .populate("userId", "name")
      .lean();

    const createCommentTree = (commentsFlatArr) => {
      const commentMap = new Map();
      const tree = [];
      commentsFlatArr.forEach((comment) => {
        commentMap[comment._id] = { ...comment, replies: [] };
      });

      commentsFlatArr.forEach((comment) => {
        if (comment.replyTo && commentMap[comment.replyTo]) {
          commentMap[comment.replyTo].replies.push(commentMap[comment._id]);
        } else {
          tree.push(commentMap[comment._id]);
        }
      });

      return tree;
    };

    const structuredComments = createCommentTree(comments);

    res.status(200).send(structuredComments);
  } catch (error) {
    next(error);
  }
};

// @desc edit comment
// PUT /api/comments/:id
// @access private
const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const { content, userId } = req.body;

    if (!content) {
      throw customError(400, "Content is required");
    }
    if (userId !== req.user?._id.toString()) {
      throw customError(400, "Failed to update comment");
    }

    await Comments.updateOne(
      { _id: commentId },
      { content: content },
      { new: true }
    );

    res.status(200).send({ message: "Comment updated" });
  } catch (error) {
    next(error);
  }
};

// @desc delete comment
// DELETE /api/comments/:id
// @access private
const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comments.findOne({ _id: commentId }).lean();
    const userId = req.user?._id.toString();

    if (userId !== comment.userId.toString()) {
      throw customError(400, "Failed to delete comment");
    }

    const allComments = await Comments.find({ itemId: comment.itemId }).lean();

    const repliesMap = new Map();

    allComments?.forEach((comment) => {
      const repliedTo = comment.replyTo || null;
      if (!repliesMap[repliedTo]) {
        repliesMap[repliedTo] = [];
      }

      repliesMap[repliedTo].push(comment._id.toString());
    });

    const commentIdsToDelete = [];

    const collectIds = (parentCommentId) => {
      commentIdsToDelete.push(parentCommentId);
      const replies = repliesMap[parentCommentId];
      replies?.forEach((id) => collectIds(id));
    };

    collectIds(commentId);

    await Comments.deleteMany({ _id: { $in: commentIdsToDelete } });

    res.status(200).send({ message: "Comment deleted" });
  } catch (error) {
    next(customError);
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
