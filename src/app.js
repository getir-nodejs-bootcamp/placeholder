require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("An error occured while connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
