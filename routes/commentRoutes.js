const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getComments);
router.post("/", verifyAuth, createComment);
router
  .route("/:id")
  .put(verifyAuth, updateComment)
  .delete(verifyAuth, deleteComment);

module.exports = router;
