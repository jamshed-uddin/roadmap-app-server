const express = require("express");
const {
  getRoadmaps,
  getSingleRoadmap,
} = require("../controllers/roadmapController");
const router = express.Router();

router.get("/", getRoadmaps);
router.get("/:id", getSingleRoadmap);

module.exports = router;
