const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
dotenv.config();
const PORT = process.env.PORT || 5000;

connectdb();

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.use("/api/users", userRouter);

// app.get("/token", async (req, res) => {
//   const token = req.headers?.authorization.split(" ")[1];
//   console.log(token);

//   const verifiedToken = await verifyToken(token, {
//     jwtKey: process.env.JWK,
//   });
//   console.log(verifiedToken);
//   res.send({ message: "token docoded" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
