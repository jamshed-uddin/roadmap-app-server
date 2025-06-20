const Roadmaps = require("../models/roadmapModel");

const getRoadmaps = async (req, res, next) => {
  try {
    const {} = req.query;

    const roadmaps = await Roadmaps.find({});
    res.status(200).json(roadmaps);
  } catch (error) {
    next(error);
  }
};

const getSingleRoadmap = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmaps,
  getSingleRoadmap,
};
