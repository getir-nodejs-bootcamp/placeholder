const Post = require("../models/Post");

const createPostController = async (req, res) => {
  const { author, title, shortInfo, body } = req.body;
  const post = new Post({
    author,
    title,
    shortInfo,
    body,
  });

  // TODO: Validation

  try {
    await post.save();
    res.status(201).send({ post });
  } catch (err) {
    console.log("an error occured while creating post", err);
    res.status(500).send(err);
  }
};

const getPostController = async (req, res) => {
  const { id: postID } = req.params;
  try {
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send({ post });
  } catch (err) {
    console.log("an error occured while getting post", err);
    res.status(500).send(err);
  }
};

const getAllPostsController = async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const posts = await Post.find().limit(Number(limit)).skip(Number(skip));
    res.send({ posts });
  } catch (err) {
    console.log("an error occured while getting all posts", err);
    res.status(500).send(err);
  }
};

module.exports = {
  createPostController,
  getPostController,
  getAllPostsController,
};
