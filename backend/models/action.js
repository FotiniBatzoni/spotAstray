const Joi = require("joi");
const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  action: [
    {
      type: String,
      required: true,
    },
  ],
});

const Action = new mongoose.model("Action", actionSchema);

function validateAction(action) {
  const schema = Joi.object({
    action: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .required()
      .min(2)
      .max(255)
      .message({
        "string.pattern.invert.base": `ACTION_ILLEGAL_CHAR`,
        "any.required": `ACTION_REQUIRED`,
        "string.min": `ACTION_MIN_2_CHARS`,
        "string.max": `ACTION_MAX_255_CHARS`,
        "any.empty": `ACTION_MUST_NOT_EMPTY`,
      }),
  });
  return schema.validate(action);
}

module.exports.Action = Action;
module.exports.validateAction = validateAction;
