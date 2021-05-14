const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Post } = require("../models/post");
const { Comment, validateComment } = require("../models/comment");

router.post("/", [auth], async (req, res) => {
  const { error } = validateComment(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  }

  let comment = new Comment({
    post: req.postId,
    content: req.body.content,
    user: req.user._id,
  });

  await comment.save();
  await Post.findByIdAndUpdate(req.postId, {
    $push: { comments: comment._id },
  });

  comment = await Comment.findAndPopulate({ _id: comment._id }, true);
  return res.send(comment);
});

router.put("/:commentId", [auth], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.commentId)) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  const { error } = validateComment(req.body);
  // console.log(error);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
  }

  let comment = await Comment.findOne({
    user: req.user._id,
    _id: req.params.commentId,
  });

  if (!comment) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  comment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      content: req.body.content,
    },
    { new: true }
  );

  return res.send(comment);
});

//Get all comments by postId
router.get("/", async (req, res) => {
  let comment = await Comment.find({ post: req.postId });
  if (!comment) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  comment = await Comment.findAndPopulate({ post: req.postId });
  return res.send(comment);
});

//Get comment by commentId
router.get("/:commentId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.commentId)) {
    return res.status(400).send({ message: "COMMENT_NOT_FOUND" });
  }

  let comment = await Comment.findOne({ _id: req.params.commentId });
  if (!comment) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  comment = await Comment.findAndPopulate({ post: req.postId }, true);

  return res.send(comment);
});

//Get all comments by userId
router.get("/user/:userId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.status(400).send({ message: "USER_NOT_FOUND" });
  }

  let comment = await Comment.findAndPopulate({ user: req.params.userId });
  if (comment.length === 0) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  return res.send(comment);
});

//soft delete comment by commentId
router.delete("/:commentId", [auth], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.commentId)) {
    return res.status(400).send({ message: "COMMENT_NOT_FOUND" });
  }

  let comment = await Comment.findOne({ _id: req.params.commentId });
  if (!comment) {
    return res.status(404).send({ message: "COMMENT_NOT_FOUND" });
  }

  if (comment.isActive) {
    comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      { isActive: false },
      { new: true }
    );
  } else {
    return res.send({ message: "COMMENT_ALREADY_DELETED", comment });
  }

  return res.send({ message: "COMMENT_DELETED", comment });
});

module.exports = router;
