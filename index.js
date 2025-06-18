const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { verifyToken } = require("@clerk/backend");
dotenv.config();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.get("/token", async (req, res) => {
  const token = req.headers?.authorization.split(" ")[1];
  console.log(token);

  const verifiedToken = await verifyToken(token, {
    jwtKey: process.env.JWK,
  });
  console.log(verifiedToken);
  res.send({ message: "token docoded" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
