const Upvotes = require("../models/upvoteModel");
const Roadmaps = require("../models/roadmapModel");
const RoadmapItems = require("../models/roadmapItemModel");
const customError = require("../utils/customError");
const { default: mongoose } = require("mongoose");

// @desc save upvote
// POST /api/upvotes
// @access Private

const saveUpvote = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user?._id;
    const { itemId } = req.body;

    if (!itemId) {
      throw customError(400, "Item id is requried");
    }
    const roadmapItem = await RoadmapItems.findOne({ _id: itemId })
      .lean()
      .session(session);

    const newUpvote = { userId, itemId };
    await Upvotes.create([newUpvote], { session });
    await Roadmaps.updateOne(
      { _id: roadmapItem?.roadmapId },
      {
        $inc: { upvoteCount: 1 },
      },
      { session }
    );

    await session.commitTransaction();
    res.status(200).send({ message: "Upvoted" });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc get upvotes
// GET /api/upvotes
// query params - itemId: string
// @access Private
const getUpvotes = async (req, res, next) => {
  try {
    const itemId = req.query.itemId;

    if (!itemId) {
      throw customError(400, "Item id is required");
    }
    const upvotes = await Upvotes.find({
      itemId: itemId,
    }).lean();

    res.status(200).send(upvotes);
  } catch (error) {
    next(error);
  }
};

// @desc delete upvotes
// DELETE /api/upvotes/:id
// @access Private
const deleteUpvotes = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const roadmapItem = await RoadmapItems.findOne({ _id: id })
      .lean()
      .session(session);

    await Upvotes.deleteOne({ userId: userId, itemId: id }, { session });
    await Roadmaps.updateOne(
      { _id: roadmapItem?.roadmapId },
      { $inc: { upvoteCount: -1 } },
      { session }
    );
    await session.commitTransaction();
    res.status(200).send({ message: "Upvote removed" });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

module.exports = { saveUpvote, getUpvotes, deleteUpvotes };
