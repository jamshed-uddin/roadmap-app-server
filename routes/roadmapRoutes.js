const express = require("express");
const {
  getRoadmaps,
  getSingleRoadmap,
} = require("../controllers/roadmapController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", verifyAuth, getRoadmaps);
router.get("/:id", getSingleRoadmap);

module.exports = router;
