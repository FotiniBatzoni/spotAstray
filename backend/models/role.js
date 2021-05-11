const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlengt: 50,
    unique: true,
  },
  titleEn: {
    type: String,
    required: true,
    minlength: 2,
    maxlengt: 50,
    unique: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

function validateRole(role) {
  const schema = Joi.object({
    priority: Joi.number().integer().min(0).unique().messages({
      "any.number": "MUST_BE_NUMBER",
      "number.integer": "MUST_BE_INTEGER",
      "number.min": "MINIMUM_0",
      "any.unique": "MUST_BE_UNIQUE",
    }),
    title: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .unique()
      .messages({
        "string.pattern.invert.base": "ILLEGAL_CHAR_TITLE",
        "string.min": "MINIMUN_2_CHARS",
        "string.max": "MAXIMUM_50_CHARS",
        "any.unique": "MUST_BE_UNIQUE",
        "any.required": "REQUIRED_FIELD",
      }),
    titleEn: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .unique()
      .messages({
        "string.pattern.invert.base": "ILLEGAL_CHAR_TITLE",
        "string.min": "MINIMUN_2_CHARS",
        "string.max": "MAXIMUM_50_CHARS",
        "any.unique": "MUST_BE_UNIQUE",
        "any.required": "REQUIRED_FIELD",
      }),
  });
  return schema.validate(role);
}

module.exports.Role = Role;
module.exports.validateRole = validateRole;
