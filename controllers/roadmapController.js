const Roadmaps = require("../models/roadmapModel");
const RoadmapItems = require("../models/roadmapItemModel");
const Progresses = require("../models/progressModel");
const customError = require("../utils/customError");

// @desc Get roadmaps
// GET /api/roadmaps
// @access Public
const getRoadmaps = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { popular, status } = req.query;

    if (userId && status) {
      const aggr = [
        {
          $match: {
            userId,
            status: {
              $in: ["inProgress", "complete"],
            },
          },
        },

        {
          $group: {
            _id: "$roadmapId",
            completedCount: {
              $sum: {
                $cond: [{ $eq: ["$status", "complete"] }, 1, 0],
              },
            },
          },
        },
        {
          $lookup: {
            from: "roadmapitems",
            localField: "_id",
            foreignField: "roadmapId",
            as: "roadmapItems",
          },
        },
        {
          $addFields: {
            totalItems: { $size: "$roadmapItems" },
          },
        },
        {
          $addFields: {
            userStatus: {
              $cond: [
                {
                  $eq: ["$completedCount", "$totalItems"],
                },
                "complete",
                "inProgress",
              ],
            },
          },
        },
        {
          $lookup: {
            from: "roadmaps",
            localField: "_id",
            foreignField: "_id",
            as: "roadmap",
          },
        },
        {
          $unwind: "$roadmap",
        },
        {
          $match: {
            userStatus: status,
          },
        },
        {
          $replaceRoot: {
            newRoot: "$roadmap",
          },
        },
      ];

      if (popular) {
        aggr.push({ $sort: { upvoteCount: -1 } });
      }

      aggr.push({
        $project: {
          _id: 1,
          title: 1,
        },
      });

      const filteredRoadmap = await Progresses.aggregate(aggr);
      return res.status(200).send(filteredRoadmap);
    }

    const sort = {};

    if (popular) {
      sort.upvoteCount = -1;
    }

    const roadmaps = await Roadmaps.find({}).sort(sort).select("title");
    res.status(200).send(roadmaps);
  } catch (error) {
    next(error);
  }
};

// @desc Get a roadmaps
// GET /api/roadmaps/:id
// @access Public
const getSingleRoadmap = async (req, res, next) => {
  try {
    const id = req.params.id;

    const roadmap = await Roadmaps.findById(id).lean();
    if (!roadmap) {
      throw customError(404, "Roadmap not found");
    }

    const roadmapItems = await RoadmapItems.find({ roadmapId: id })
      .sort({ createdAt: 1 })
      .lean();

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
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmaps,
  getSingleRoadmap,
};
