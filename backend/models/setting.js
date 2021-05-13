const Joi = require("joi");
const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  sendNotification: [
    {
      name: String,
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  havePreferences: [
    {
      name: String,
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Setting = mongoose.model("Setting", settingSchema);

function validateSetting(setting) {
  const schema = Joi.object({
    sendNotification: Joi.Mixed().default(true).allow("", null),
    havePreferences: Joi.Mixed().default(true).allow("", null),
  });
  return schema.validate(setting);
}

module.exports.Setting = Setting;
module.exports.validateSetting = validateSetting;
