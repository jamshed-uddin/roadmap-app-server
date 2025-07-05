const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const customError = require("../utils/customError");

const verifyRoadmapRequest = async (req, res, next) => {
  try {
    const queryParams = req.url;

    let token;
    token = req.header("Authorization")?.split(" ")[1];

    if (queryParams.includes("status") && token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await Users.findById(decoded._id).select("-password");
      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyRoadmapRequest;
