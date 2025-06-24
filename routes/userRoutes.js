const express = require("express");
const {
  loginUser,
  registerUser,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changepassword", changePassword);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
