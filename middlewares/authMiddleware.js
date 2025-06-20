const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const Users = require("../models/userModel");

const verifyAuth = async (req, res, next) => {
  let token;

  token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw customError(
      401,
      ` ${
        process.env.NODE_ENV === "development"
          ? "Authorization failed - no valid token"
          : "Access denied"
      }`
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Users.findById(decoded._id).select("-password");

    if (!user) {
      throw customError(
        401,
        ` ${
          process.env.NODE_ENV === "development"
            ? "Authorization failed - no valid token"
            : "Access denied"
        }`
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyAuth };
