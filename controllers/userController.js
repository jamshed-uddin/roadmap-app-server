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

//@desc update user
// POST /api/users/:id
// @access Private
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const user = await Users.findOne({ _id: id });
    if (!user) {
      throw customError(404, "User not found");
    }

    const updatedUser = await Users.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true }
    ).lean();

    const newUser = updatedUser;
    delete newUser.password;

    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

//@desc update password
// PUT /api/users/changepassword
// @access Private
const changePassword = async (req, res, next) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      throw customError(400, "Required field is missing");
    }

    const user = await Users.findById({ _id: userId });

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
    } else {
      throw customError(400, "Something went wrong.");
    }

    res.status(200).send({ message: "Password changed." });
  } catch (error) {
    next(error);
  }
};

//@desc delete user
// DELETE /api/users/:id
// @access Private
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    if (!userId || !password) {
      throw customError(400, "Required field is missing.");
    }

    const user = await Users.findOne({ _id: userId });

    if (user && (await user.matchPassword(password))) {
      await Users.deleteOne({ email: userEmail });
    } else {
      throw customError(400, "Something went wrong");
    }

    res.status(200).send({ message: "User deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  changePassword,
  deleteUser,
};
