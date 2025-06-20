const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();
const RoadmapItems = require("./models/roadmapItemModel");
const Roadmap = require("./models/roadmapModel");
const { default: mongoose } = require("mongoose");

const PORT = process.env.PORT || 5000;
connectdb();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
