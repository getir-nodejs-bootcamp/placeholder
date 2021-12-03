const express = require("express");
const {
  createPostController,
  getPostController,
  getAllPostsController,
} = require("../controllers/post");
const router = express.Router();

router.get("/", getAllPostsController);
router.get("/:id", getPostController);

router.post("/", createPostController);

module.exports = router;
