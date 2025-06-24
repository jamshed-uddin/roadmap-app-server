const express = require("express");
const {
  saveProgress,
  getRoadmapProgresses,
  getRoadmapItemProgress,
  updateProgress,
} = require("../controllers/progressController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(verifyAuth);

router.post("/", saveProgress);
router.get("/roadmap-progress/:roadmapId", getRoadmapProgresses);
router.get("/:itemId", getRoadmapItemProgress);
router.put("/:id", updateProgress);

module.exports = router;
