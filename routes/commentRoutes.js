const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(verifyAuth);
router.route("/").post(createComment).get(getComments);
router.route("/:id").put(updateComment).delete(deleteComment);

module.exports = router;
