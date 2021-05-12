const Joi = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    maxlength: 63200,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    content: Joi.string()
      .required()
      .min(1)
      .max(63200)
      .regex(/[$\(\)<>]/, { invert: true })
      .message({
        "string.pattern.invert.base": `ILLEGAL_CHARS_COMMENT`,
        "string.empty": `NOT_EMPTY_COMMENT`,
        "string.min": `NOT_EMPTY_COMMENT`,
        "string.max": `MAXIMUM_63200_COMMENT`,
        "any.required": `NOT_EMPTY_COMMENT`,
      }),
  });
  return schema.validate(comment);
}

module.exports.Comment = Comment;
module.exports.validate = validateComment;
