const Upvotes = require("../models/upvoteModel");
const customError = require("../utils/customError");

const saveUpvote = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { itemId } = req.body;

    if (!itemId) {
      throw customError(400, "Item id is requried");
    }

    const newUpvote = { userId, itemId };
    await Upvotes.insertOne(newUpvote);
    res.status(200).send({ message: "Upvoted" });
  } catch (error) {
    next(error);
  }
};

const getUpvotes = async (req, res, next) => {
  try {
    const itemId = req.query.item;
    const userId = req.user?._id;
    if (!itemId) {
      throw customError(400, "Item id is required");
    }
    const upvotes = await Upvotes.find({
      itemId: itemId,
      userId: userId,
    }).lean();

    res.status(200).send(upvotes);
  } catch (error) {
    next(error);
  }
};

const deleteUpvotes = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { itemId } = req.params;
    await Upvotes.deleteOne({ userId: userId, itemId: itemId });
    res.status(200).send({ message: "Upvote removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { saveUpvote, getUpvotes, deleteUpvotes };
