const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");

router.post("/", [auth], async (req, res) => {
  const { error } = validatePost(req.body);
  //console.log(error);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const input = {
    content: req.body.content,
    image: req.body.image,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    petSex: req.body.petSex,
    petColor: req.body.petColor,
    petSize: req.body.petSize,
    user: req.user._id,
  };

  let post = new Post(input);
  await post.save();

  await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });

  return res.send(post);
});

router.put("/:postId", [auth], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  const { error } = validatePost(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let post = await Post.findOne({
    user: req.user._id,
    _id: req.params.postId,
  });

  if (!post) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      content: req.body.content,
      image: req.body.image,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      petSex: req.body.petSex,
      petColor: req.body.petColor,
      petSize: req.body.petSize,
      user: req.user._id,
    },
    { new: true }
  );

  return res.send(post);
});

//it returns all posts
router.get("/", async (req, res) => {
  let posts = "";
  posts = await Post.find().sort("createdAt");

  if (!posts) {
    return res.status(404).send({ message: "POSTS_NOT_FOUND" });
  }

  return res.send(posts);
});

//it returns the post by  postId
router.get("/:postId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  let post = await Post.findOne({ _id: req.params.postId });

  if (!post) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  return res.send(post);
});

//it returns posts by userId
router.get("/user/:userId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.status(404).send("USER_NOT_FOUND");
  }

  let posts = await Post.find({ user: req.params.userId });

  if (posts.length === 0) {
    return res.status(404).send("USER_HAS_NO_POSTS");
  }

  return res.send(posts);
});

router.delete("/:postId", [auth], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.postId)) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  let post = await Post.findOne({
    user: req.user._id,
    _id: req.params.postId,
  });

  if (!post || post.isActive === false) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }

  post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      isActive: false,
      user: req.user._id,
    },
    { new: true }
  );

  return res.send(post);
});

module.exports = router;
