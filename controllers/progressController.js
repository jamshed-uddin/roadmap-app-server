const Progresses = require("../models/progressModel");
const customError = require("../utils/customError");

// @desc save progress entry
// POST /api/progresses
// @access Private
const saveProgress = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { itemId, roadmapId, status } = req.body;

    if (!itemId || !roadmapId || !status) {
      throw customError(400, "Required field is missing");
    }

    await Progresses.create({ userId, itemId, roadmapId, status });
    res.status(200).send({ message: "Progress saved" });
  } catch (error) {
    next(error);
  }
};

// @desc get roadmap progress record
// GET /api/progresses/roadmap-progress/:roadmapId
// @access Private
const getRoadmapProgresses = async (req, res, next) => {
  try {
    const roadmapId = req.params.roadmapId;

    const userId = req.user?._id;
    const progresses = await Progresses.find({
      roadmapId: roadmapId,
      userId: userId,
    });

    res.status(200).send(progresses);
  } catch (error) {
    next(error);
  }
};

// @desc get roadmap item progress record
// GET /api/progresses/:itemId  (item id here is the roadmap item id)
// @access Private
const getRoadmapItemProgress = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.user?._id;

    const progress = await Progresses.findOne({ itemId, userId });

    res.status(200).send({ progress: progress || {} });
  } catch (error) {
    next(error);
  }
};

// @desc update progress status
// GET /api/progresses/:id
// @access Private
const updateProgress = async (req, res, next) => {
  try {
    const progressId = req.params.id;
    const { status } = req.body;

    if (status === "pending") {
      await Progresses.deleteOne({ _id: progressId });
      return res.status(200).send({ message: "Status updated" });
    }

    await Progresses.updateOne({ _id: progressId }, { status }, { new: true });

    res.status(200).send({ message: "Progress status updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveProgress,
  getRoadmapProgresses,
  getRoadmapItemProgress,
  updateProgress,
};
