const express = require("express");
const { syncUserWithClerk } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/clerkwebhook",
  express.raw({ type: "application/json" }),
  syncUserWithClerk
);
module.exports = router;
