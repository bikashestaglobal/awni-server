const Joi = require("joi");

module.exports.createContactUs = Joi.object({
  address: Joi.string(),
  email: Joi.string().email().required(),
  mobile_1: Joi.string().min(10).required(),
  mobile_2: Joi.string().min(10),
  customer_care_no: Joi.string().min(10),
  whatsapp_no: Joi.string().min(10),
  facebook: Joi.string().trim().uri(),
  instagram: Joi.string().trim().uri(),
  twitter: Joi.string().trim().uri(),
  linkedin: Joi.string().trim().uri(),
});

module.exports.deleteContactUs = Joi.object({
  id: Joi.number(),
});

module.exports.updateContactUs = Joi.object({
  address: Joi.string(),
  email: Joi.string().email(),
  mobile_1: Joi.string().min(10),
  mobile_2: Joi.string().min(10),
  customer_care_no: Joi.string().min(10),
  whatsapp_no: Joi.string().min(10),
  facebook: Joi.string().trim().uri(),
  instagram: Joi.string().trim(),
  twitter: Joi.string().trim(),
  linkedin: Joi.string().trim(),
});
