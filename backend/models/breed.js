const mongoose = require("mongoose");
const Joi = require("joi");

const breedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const Breed = mongoose.model("Breed", breedSchema);

function validateBreed(breed) {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/[$\(\)<>]/, { invert: true })
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.pattern.invert.base": "ILLEGAL_CHAR_TITLE",
        "string.min": "MINIMUN_2_CHARS",
        "string.max": "MAXIMUM_50_CHARS",
        "any.required": "REQUIRED_FIELD",
      }),
  });
  return schema.validate(breed);
}

module.exports.Breed = Breed;
module.exports.validateBreed = validateBreed;
