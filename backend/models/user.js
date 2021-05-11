const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const roleSchema = new mongoose.Schema(
  {
    titleEn: {
      type: String,
    },
    title: {
      type: String,
    },
    priority: {
      type: Number,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  hash: {
    type: String,
    default: null,
  },
  postalcode: {
    type: String,
    default: null,
    minlength: 5,
    maxlength: 5,
  },
  location: {
    type: String,
    default: null,
    minlength: 2,
    maxlength: 50,
  },
  telephone: {
    type: String,
    default: null,
    minlength: 10,
    maxlength: 14,
  },
  sendNotification: {
    type: Boolean,
    default: true,
    required: true,
  },
  role: roleSchema,
  isEmailVerified: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      fullname: this.fullname,
      email: this.email,
    },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string()
      .regex(/[$\(\)<>0-9]/, { invert: true })
      .min(2)
      .max(50)
      .messages({
        "string.pattern.invert.base": "FULLNAME_ILLEGAL_CHAR",
        "any.required": "INVALID_FULLNAME",
        "string.empty": "FULLNAME_MUST_NOT_BE_EMPTY",
        "string.min": "FULLNAME_MINIMUN_2_CHARS",
        "string.max": "FULLNAME_MAXIMUM_50_CHARS",
      }),
    email: Joi.string()
      .email()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(5)
      .max(50)
      .messages({
        "string.pattern.invert.base": "EMAIL_ILLEGAL_CHAR",
        "string.empty": "EMAIL_MUST_NOT_BE_EMPTY",
        "string.email": "INVALID_EMAIL",
        "any.required": "INVALID_EMAIL",
        "any.unique": "INVALID_EMAIL",
        "string.min": "INVALID_EMAIL",
        "string.max": "INVALID_EMAIL",
      }),
    password: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(6)
      .max(255)
      .messages({
        "string.pattern.invert.base": "ILLEGAL_CHAR_PASSWORD",
        "string.empty": "PASSWORD_MUST_NOT_BE_EMPTY",
        "any.required": "PASSWORD_REQUIRED",
        "string.min": "MINIMUM_6_CHARS",
        "string.max": "MAXIMUM_255_CHARS",
      }),
    postalcode: Joi.string()
      .allow("", null)
      .default(null)
      .min(5)
      .max(6)
      .messages({
        "any.number": "MUST_BE_NUMBER",
        "number.min": "MINIMUM_5_CHARS",
        "number.max": "MAXIMUM_5_CHARS",
      }),
    location: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .allow("", null)
      .default(null)
      .min(2)
      .max(50)
      .messages({
        "string.pattern.invert.base": "ILLEGAL_CHAR_LOCATION",
        "string.min": "MINIMUM_2_CHARS",
        "string.max": "MAXIMUM_50_CHARS",
      }),
    telephone: Joi.string()
      .min(10)
      .max(14)
      .default(null)
      .allow("", null)
      .messages({
        "any.number": "MUST_BE_NUMBER",
        "number.min": "MINIMUM_10_CHARS",
        "number.max": "MAXIMUM_14_CHARS",
      }),
    sendNotification: Joi.boolean().default(true).required().messages({
      "any.required": "REQUIRED_FIELD",
      "boolean.base": "INVALID_NOTIFICATION",
    }),
    isEmailVerified: Joi.boolean().default(true).messages({
      "any.required": "REQUIRED_FIELD",
      "boolean.base": "NO_VERIFICATION",
    }),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
