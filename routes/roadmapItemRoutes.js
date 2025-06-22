const express = require("express");
const { getRoadmapItem } = require("../controllers/roadmapItemController");

const router = express.Router();

router.get("/:id", getRoadmapItem);

module.exports = router;
