const express = require("express");
const router = new express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config(); //
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ message: "WRONG_INPUTS" });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: "WRONG_INPUTS" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "WRONG_INPUTS" });
  }

  const token = user.generateAuthToken();
  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
  };

  return res.send({ token: token });
});

function validate(request) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(5)
      .max(50)
      .messages({
        "string.pattern.invert.base": `EMAIL_ILLEGAL_CHAR`,
        "string.email": `INVALID_EMAIL`,
        "string.empty": `EMAIL_MUST_NOT_BE_EMPTY`,
        "any.required": `INVALID_EMAIL`,
        "any.unique": `INVALID_EMAIL`,
        "string.min": `INVALID_EMAIL`,
        "string.max": `INVALID_EMAIL`,
      }),
    password: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(6)
      .max(255)
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_PASSWORD`,
        "string.empty": `INVALID_PASSWORD`,
        "any.required": `INVALID_PASSWORD`,
        "string.min": `INVALID_PASSWORD`,
        "string.max": `INVALID_PASSWORD`,
      }),
  });

  return schema.validate(request);
}

module.exports = router;
