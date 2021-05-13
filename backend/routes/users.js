const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUpdateUser } = require("../models/user");
const { Setting, validateSetting } = require("../models/setting");

router.get("/me", [auth], async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).send({ message: "USER_NOT_FOUND" });
  }

  const userDetails = await await await User.findOne(
    { _id: req.user._id },
    { fullname: 1, email: 1, postalcode: 1, telephone: 1 }
  );

  return res.send(userDetails);
});

router.put("/", [auth], async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  //console.log(error);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let input = {
    fullname: req.body.fullname,
    password: req.body.password,
    postalcode: req.body.postalcode,
    telephone: req.body.telephone,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
  };

  let user = await await User.findOneAndUpdate(req.user._id, input, {
    new: true,
  }).select("-posts");

  return res.send(user);
});

module.exports = router;
