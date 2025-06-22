const express = require("express");
const {
  saveUpvote,
  getUpvotes,
  deleteUpvotes,
} = require("../controllers/upvoteController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(verifyAuth);
router.route("/").post(saveUpvote).get(getUpvotes);
router.delete("/:id", deleteUpvotes);

module.exports = router;
