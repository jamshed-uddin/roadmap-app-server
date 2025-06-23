const customError = require("../utils/customError");
const Comments = require("../models/commentModel");
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

const getComments = async (req, res, next) => {
  try {
    const itemId = req.query.item;
    if (!itemId) {
      throw customError(400, "Item id is required");
    }

    const comments = await Comments.find({ itemId: itemId })
      .populate("userId", "name")
      .lean();

    console.log(comments);

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
      //   console.log(tree);
      console.log(commentMap);
      return tree;
    };

    const structuredComments = createCommentTree(comments);

    res.status(200).send(structuredComments);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const { content, userId } = req.body;

    if (!content) {
      throw customError(400, "Content is required");
    }
    if (userId !== req.user?._id) {
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

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    await Comments.deleteOne({ _id: commentId });
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
