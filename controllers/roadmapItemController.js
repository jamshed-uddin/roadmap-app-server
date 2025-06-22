const RoadmapItems = require("../models/roadmapItemModel");

const getRoadmapItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (userId) {
      //todo: get progress status
    }

    const roadmapItem = await RoadmapItems.findById(id).lean();

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
