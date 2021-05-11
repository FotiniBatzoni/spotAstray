const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const sendMail = require("../utilities/mail");
const {
  forgot_pass_subject,
  forgot_pass_body,
} = require("../utilities/forgot_pass_message");

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({ message: "EMAIL_NOT_FOUND" });
  }

  await sendMail(
    user.email,
    forgot_pass_subject(),
    forgot_pass_body(user.email)
  );

  return res.send({ message: "PASSWORD_RESTORATION_SEND" });
});

module.exports = router;
