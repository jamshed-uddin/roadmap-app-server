const Users = require("../models/userModel");
const customError = require("../utils/customError");
const generateToken = require("../utils/generateToken");
const {
  validateUserInfo,
  validateUserCredentials,
} = require("../utils/validate");

// @desc login user
// POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  try {
    const { error, value: userCredentials } = validateUserCredentials(req.body);
    if (error) {
      throw customError(401, error.message);
    }

    console.log(req.body, userCredentials);

    const user = await Users.findOne({ email: userCredentials.email });

    if (user && (await user.matchPassword(userCredentials.password))) {
      const responseObject = user?.toObject();
      delete responseObject.password;
      responseObject.token = generateToken(responseObject._id);

      res.status(200).send({
        message: "Login succesful",
        data: responseObject,
      });
    } else {
      throw customError(400, "Invalid credentials");
    }
    res.send({ message: "done" });
  } catch (error) {
    next(error);
  }
};

//@desc register user
// POST /api/users/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { error, value: userInfo } = validateUserInfo(req.body);

    if (error) {
      throw customError(400, error.message);
    }

    const existingUser = await Users.findOne({
      email: userInfo.email,
    });

    if (existingUser) {
      throw customError(400, "An account with this email already exists");
    }

    const newUser = await Users.create(userInfo);

    const responseObject = newUser?.toObject();
    delete responseObject.password;
    responseObject.token = generateToken(responseObject._id);

    const response = { message: "User registered", data: responseObject };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, registerUser };
