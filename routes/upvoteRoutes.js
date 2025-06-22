const express = require("express");
const {
  saveUpvote,
  getUpvotes,
  deleteUpvotes,
} = require("../controllers/upvoteController");
const router = express.Router();

router.route("/").post(saveUpvote).get(getUpvotes);
router.delete("/:id", deleteUpvotes);

module.exports = router;
