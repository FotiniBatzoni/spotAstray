const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const { Role } = require("../models/role");
const { verificationEmail } = require("../utilities/mailMessages");
const email = require("../utilities/mail");
const generateStringCode = require("../utilities/generateStringCode");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  //console.log(error);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const input = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    postalcode: req.body.postalcode,
    telephone: req.body.telephone,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: "USER_ALREADY_EXISTS" });

  user = new User(input);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.hash = generateStringCode();

  user.password = hashed;
  await user.save();

  // //email verification
  // const { subject, message } = verificationEmail(req, user);
  // //send verification email
  // await email(user.email, subject, message);

  // return res.send({ message: "VERIFICATION-EMAIL_IS_SEND" });

  user = await User.findOne({ _id: user._id }).select("-hash -password");
  return res.send(user);
});

router.get("/email-verification/:userId/:userHash", async (req, res) => {
  const user = await User.findOne({
    _id: req.params.userid,
    hash: req.params.userHash,
  });
  if (!user) {
    return res.status(404).send({ message: "NO_USER_FOUND" });
  }

  if (user.isEmailVerified)
    return res.status(422).send({ message: "USER_ALREADY_ACTIVE" });

  user.isEmailVerified = true;
  await user.save();

  return res.send({ message: "EMAIL_IS_VERIFIED" });
});

module.exports = router;
