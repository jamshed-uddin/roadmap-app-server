const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const userRoutes = require("./routes/userRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const roadmapItemRoutes = require("./routes/roadmapItemRoutes");
const upvoteRoutes = require("./routes/upvoteRoutes");
const commentRoutes = require("./routes/commentRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();

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

app.use("/api/users", userRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/roadmapitems", roadmapItemRoutes);
app.use("/api/upvotes", upvoteRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`);
});
