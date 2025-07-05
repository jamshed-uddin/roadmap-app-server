const express = require("express");
const {
  saveUpvote,
  getUpvotes,
  deleteUpvotes,
} = require("../controllers/upvoteController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getUpvotes);
router.post("/", verifyAuth, saveUpvote);
router.delete("/:id", verifyAuth, deleteUpvotes);

module.exports = router;
