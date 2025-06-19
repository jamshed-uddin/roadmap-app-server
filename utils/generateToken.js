const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.SECRET, {
    expiresIn: "30d",
  });

  return token;
};

module.exports = generateToken;
