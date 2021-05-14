const express = require("express");
const router = express.Router();
const { Post } = require("../models/post");

router.post("/prefill", async (req, res) => {
  const param = req.body.param;
  if (param.length < 2) return res.send([]);

  const postSearch = await Post.find({
    $or: [
      { content: { $regex: param + ".*", $options: "i" } },
      { content: { $regex: ".*" + param + ".*", $options: "i" } },
      { content: { $regex: ".*" + param, $options: "i" } },
      { address: { $regex: param + ".*", $options: "i" } },
      { address: { $regex: ".*" + param + ".*", $options: "i" } },
      { address: { $regex: ".*" + param, $options: "i" } },
    ],
  })
    .limit(10)
    .select("_id content images");

  return res.send(postSearch);
});

router.get("/", async (req, res) => {
  const param = req.query.param;

  if (param.length < 2) return res.send([]);

  const postSearchQuery = Post.find({
    $or: [
      { content: { $regex: param + ".*", $options: "i" } },
      { content: { $regex: ".*" + param + ".*", $options: "i" } },
      { content: { $regex: ".*" + param, $options: "i" } },
      { address: { $regex: param + ".*", $options: "i" } },
      { address: { $regex: ".*" + param + ".*", $options: "i" } },
      { address: { $regex: ".*" + param, $options: "i" } },
    ],
  })
    .limit(10)
    .select("_id content images");

  const searchResult = await postSearchQuery;
  return res.send(searchResult);
});

module.exports = router;
