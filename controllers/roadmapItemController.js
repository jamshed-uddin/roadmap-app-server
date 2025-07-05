const RoadmapItems = require("../models/roadmapItemModel");

// @desc Get a roadmap item
// GET /api/roadmapitems/:id
// @access Public
const getRoadmapItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roadmapItem = await RoadmapItems.findById(id)
      .populate("roadmapId", "title")
      .lean();

    const response = {
      ...roadmapItem,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmapItem,
};
