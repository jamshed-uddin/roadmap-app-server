const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
