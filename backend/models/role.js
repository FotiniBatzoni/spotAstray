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
      "any.number": `PRIORITY_MUST_BE_NUMBER`,
      "number.integer": `PRIORITY_MUST_BE_INTEGER`,
      "number.min": `PRIORITY_MINIMUM_0`,
      "any.unique": `PRIORITY_MUST_BE_UNIQUE`,
    }),
    title: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .unique()
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_TITLE`,
        "string.min": `TITLE_MINIMUN_2_CHARS`,
        "string.max": `TITLE_MAXIMUM_50_CHARS`,
        "any.unique": `TITLE_MUST_BE_UNIQUE`,
        "any.required": `TITLE_REQUIRED_FIELD`,
      }),
    titleEn: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .unique()
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_TITLE-EN`,
        "string.min": `TITLE-EN_MINIMUN_2_CHARS`,
        "string.max": `TITLE-EN_MAXIMUM_50_CHARS`,
        "any.unique": `TITLE-EN_MUST_BE_UNIQUE`,
        "any.required": `TITLE-EN_REQUIRED_FIELD`,
      }),
  });
  return schema.validate(role);
}

module.exports.Role = Role;
module.exports.validateRole = validateRole;
