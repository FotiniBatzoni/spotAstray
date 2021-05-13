const mongoose = require("mongoose");

function passPost(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.post)) {
    return res.status(404).send({ message: "POST_NOT_FOUND" });
  }
  req.postId = req.params.post;
  next();
}

module.exports = passPost;
