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

commentSchema.statics.findAndPopulate = function (query, isSingle = false) {
  if (isSingle) {
    return this.findOne(query).populate({
      path: "user",
      select: { fullname: 1, email: 1 },
      populate: {
        path: "role",
        select: { title: 1, titleEn: 1 },
      },
    });
  } else {
    return this.find(query).populate({
      path: "user",
      select: { fullname: 1, email: 1 },
      populate: {
        path: "role",
        select: { title: 1, titleEn: 1 },
      },
    });
  }
};

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    content: Joi.string()
      .required()
      .min(1)
      .max(63200)
      .regex(/[$\(\)<>]/, { invert: true })
      .messages({
        "string.pattern.invert.base": `ILLEGAL_CHARS_COMMENT`,
        "any.required": `COMMENT_REQUIRED`,
        "string.empty": `NOT_EMPTY_COMMENT`,
        "string.min": `NOT_EMPTY_COMMENT`,
        "string.max": `MAXIMUM_63200_COMMENT`,
      }),
  });
  return schema.validate(comment);
}

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;
