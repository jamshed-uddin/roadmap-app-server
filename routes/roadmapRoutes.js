const express = require("express");
const {
  getRoadmaps,
  getSingleRoadmap,
} = require("../controllers/roadmapController");
const verifyRoadmapRequest = require("../middlewares/verifyRoadmapRequest");
const router = express.Router();

router.get("/", verifyRoadmapRequest, getRoadmaps);
router.get("/:id", getSingleRoadmap);

module.exports = router;
