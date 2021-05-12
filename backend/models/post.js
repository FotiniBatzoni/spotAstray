const Joi = require("joi");
const mongoose = require("mongoose");

const postTypeSchema = new mongoose.Schema(
  {
    case: {
      type: String,
    },
  },
  { _id: false }
);

const breedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      maxlength: 63200,
      required: true,
    },
    images: [
      {
        type: String,
        //required: true,
      },
    ],
    latitude: {
      type: Number,
      required: true,
    },
    longtitude: {
      type: Number,
      required: true,
    },
    petSex: {
      type: String,
      enum: ["M", "F", "NA"],
      required: true,
    },
    petColor: {
      type: String,
      enum: ["Black", "White", "Brown", "Grey", "Mixed"],
      required: true,
    },
    petSize: {
      type: String,
      enum: [
        "X-Small (1-5 kg)",
        "Small (5-15 kg)",
        "Medium (15-25 kg)",
        "Large (>25 kg)",
      ],
      required: true,
    },
    rescuedAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    postType: postTypeSchema,
    breed: breedSchema,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    content: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .max(63200)
      .messages({
        "string.pattern.invert.base": "CONTENT_ILLEGAL_CHAR",
        "any.required": `CONTENT_IS_REQUIRED`,
        "string.empty": `CONTENT_IS_REQUIRED`,
        "string.max": `CONTENT_MAXIMUM_63200_CHARS`,
      }),
    images: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      //.required()
      .allow("", null)
      .messages({
        "string.pattern.invert.base": `CONTENT_ILLEGAL_CHAR`,
        //"any.required": `IMAGE_IS_REQUIRED`,
        "string.empty": `CONTENT_MUST_NOT_BE_EMPTY`,
      }),
    latitude: Joi.number().required().messages({
      "any.required": `COORDINATES_ARE_REQUIRED`,
      "number.base": `COORDINATES_MUST_BE_NUMERIC`,
      "number.empty": `COORDINATES_MUST_NOT_BE_EMPTY`,
    }),
    longtitude: Joi.number().required().messages({
      "any.required": `COORDINATES_ARE_REQUIRED`,
      "number.base": `COORDINATES_MUST_BE_NUMERIC`,
      "number.empty": `COORDINATES_MUST_NOT_BE_EMPTY`,
    }),
    petSex: Joi.string().required().valid("M", "F", "NA").messages({
      "any.required": `SEX_REQUIRED`,
      "any.only": `INVALID_SEX`,
      "string.empty": `SEX_REQUIRED`,
    }),
    petColor: Joi.string()
      .required()
      .valid("Black", "White", "Brown", "Grey", "Mixed")
      .messages({
        "any.required": `COLOR_REQUIRED`,
        "any.only": `INVALID_COLOR`,
        "string.empty": `COLOR_REQUIRED`,
      }),
    petSize: Joi.string()
      .required()
      .valid(
        `X-Small (1-5 kg)`,
        `Small (5-15 kg)`,
        `Medium (15-25 kg)`,
        `Large (>25 kg)`
      )
      .messages({
        "any.required": `SIZE_REQUIRED`,
        "any.only": `INVALID_SIZE`,
        "string.empty": `SIZE_REQUIRED`,
      }),
  });
  return schema.validate(post);
}
module.exports.Post = Post;
module.exports.validatePost = validatePost;
