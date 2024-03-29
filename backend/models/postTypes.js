const mongoose = require("mongoose");
const Joi = require("joi");

const postTypeSchema = new mongoose.Schema({
  case: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const PostType = mongoose.model("PostType", postTypeSchema);

function validatePostType(postType) {
  const schema = Joi.object({
    case: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHAR_CASE`,
        "string.min": `CASE_MINIMUN_2_CHARS`,
        "string.max": `CASE_MAXIMUM_50_CHARS`,
        "any.required": `CASE_REQUIRED_FIELD`,
      }),
  });
  return schema.validate(postType);
}
module.exports.PostType = PostType;
module.exports.validatePostType = validatePostType;
