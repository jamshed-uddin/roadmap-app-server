const Roadmaps = require("../models/roadmapModel");
const RoadmapItems = require("../models/roadmapItemModel");
const customError = require("../utils/customError");

const getRoadmaps = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { popular, status } = req.query;

    // if(userId && status){

    // }

    const sort = {};

    if (popular) {
      sort.upvoteCount = -1;
    }

    const roadmaps = await Roadmaps.find({}).sort(sort).select("title");
    res.status(200).json(roadmaps);
  } catch (error) {
    next(error);
  }
};

const getSingleRoadmap = async (req, res, next) => {
  try {
    const id = req.params.id;

    const roadmap = await Roadmaps.findById(id).lean();
    if (!roadmap) {
      throw customError(404, "Roadmap not found");
    }

    const roadmapItems = await RoadmapItems.find({ roadmapId: id }).lean();

    const createRoadmapItemTree = (roamdapItemsArr) => {
      const itemMap = new Map();
      const tree = [];

      roamdapItemsArr.forEach((item) => {
        itemMap[item._id] = { ...item, items: [] };
      });

      roamdapItemsArr.forEach((item) => {
        if (item.subtopicTo && itemMap[item.subtopicTo]) {
          itemMap[item.subtopicTo].items.push(itemMap[item._id]);
        } else {
          tree.push(itemMap[item._id]);
        }
      });

      return tree;
    };

    const response = {
      ...roadmap,
      totalItems: roadmapItems?.length,
      items: createRoadmapItemTree(roadmapItems),
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmaps,
  getSingleRoadmap,
};
