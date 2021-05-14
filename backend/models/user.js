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
  telephone: {
    type: String,
    default: null,
    minlength: 10,
    maxlength: 14,
  },
  role: roleSchema,
  isEmailVerified: {
    type: Boolean,
    default: true,
  },
  latitude: {
    type: Number,
  },
  longtitude: {
    type: Number,
  },
  fcmToken: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
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
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .messages({
        "string.pattern.invert.base": `FULLNAME_ILLEGAL_CHAR`,
        "any.required": `FULLNAME_IS_REQUIRED`,
        "string.empty": `FULLNAME_NOT_EMPTY`,
        "string.min": `FULLNAME_MINIMUN_2_CHARS`,
        "string.max": `FULLNAME_MAXIMUM_50_CHARS`,
      }),
    email: Joi.string()
      .email()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(5)
      .max(50)
      .messages({
        "string.pattern.invert.base": `EMAIL_ILLEGAL_CHAR`,
        "string.empty": `EMAIL_NOT_EMPTY`,
        "string.email": `INVALID_EMAIL`,
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
    postalcode: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .allow("", null)
      .default(null)
      .min(5)
      .max(6)
      .messages({
        "any.string": `POSTALCODE_MUST_BE_NUMBER`,
        "string.min": `POSTALCODE_MINIMUM_5_CHARS`,
        "string.max": `POSTALCODE_MAXIMUM_5_CHARS`,
      }),
    telephone: Joi.string()
      .regex(/[$\(\)<>A-Za-z]/, { invert: true })
      .min(10)
      .max(14)
      .default(null)
      .allow("", null)
      .messages({
        "any.string": `TELEPHONE_MUST_BE_NUMBER`,
        "string.min": `TELEPHONE_MINIMUM_10_CHARS`,
        "string.max": `TELEPHONE_MAXIMUM_14_CHARS`,
      }),
    latitude: Joi.number().allow("", null).messages({
      "any.required": `LATITUDE_ARE_REQUIRED`,
      "number.base": `LATITUDE_MUST_NUMERIC`,
    }),
    longtitude: Joi.number().allow("", null).messages({
      "any.required": `LONGTITUDES_ARE_REQUIRED`,
      "number.base": `LONGTITUDES_MUST_NUMERIC`,
    }),
    fcmToken: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .allow("")
      .messages({
        "string.pattern.invert.base": `FCMTOKEN_ILLEGAL_CHAR`,
      }),
    isEmailVerified: Joi.boolean().default(true).messages({
      "any.required": `ISEMAILVERIFIED_REQUIRED_FIELD`,
      "boolean.base": `ISEMAILVERIFIED_NO_VERIFICATION`,
    }),
  });
  return schema.validate(user);
}

function validateUpdateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(2)
      .max(50)
      .messages({
        "string.pattern.invert.base": `FULLNAME_ILLEGAL_CHAR`,
        "any.required": `INVALID_FULLNAME`,
        "string.empty": `FULLNAME_NOT_EMPTY`,
        "string.min": `FULLNAME_MINIMUN_2_CHARS`,
        "string.max": `FULLNAME_MAXIMUM_50_CHARS`,
      }),
    email: Joi.string()
      .email()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(5)
      .max(50)
      .messages({
        "string.pattern.invert.base": `EMAIL_ILLEGAL_CHAR`,
        "string.empty": `EMAIL_NOT_EMPTY`,
        "string.email": `INVALID_EMAIL`,
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
    postalcode: Joi.string()
      .regex(/[$\(\)<>A-Za-z]/, { invert: true })
      .required()
      .allow("")
      .min(5)
      .max(6)
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_PASSWORD`,
        "any.string": `POSTALCODE_MUST_BE_NUMERIC`,
        "string.min": `POSTCALCODE_MINIMUM_5_CHARS`,
        "string.max": `POSTALCODE_MAXIMUM_5_CHARS`,
      }),
    telephone: Joi.string()
      .regex(/[$\(\)<>A-Za-z]/, { invert: true })
      .min(10)
      .max(14)
      .required()
      .allow("")
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_PASSWORD`,
        "any.string": `TELEPHONE_MUST_BE_NUMBER`,
        "string.min": `TELEPHONE_MINIMUM_10_CHARS`,
        "string.max": `TELEPHONE_MAXIMUM_14_CHARS`,
      }),
    latitude: Joi.number().allow("").required().messages({
      "any.required": `LATITUDE_ARE_REQUIRED`,
      "number.base": `LATITUDE_MUST_BE_NUMERIC`,
    }),
    longtitude: Joi.number().allow("").required().messages({
      "any.required": `LONGTITUDE_ARE_REQUIRED`,
      "number.base": `LONGITUDE_MUST_BE_NUMERIC`,
    }),
    isEmailVerified: Joi.boolean().default(true).messages({
      "any.required": `ISEMAILVERIFIED_REQUIRED_FIELD`,
      "boolean.base": `ISEMAILVERIFIED_NO_VERIFICATION`,
    }),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateUpdateUser = validateUpdateUser;
