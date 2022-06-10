const Joi = require("joi");

module.exports.createExperienceCentre = Joi.object({
  name: Joi.string().trim().required().min(2),
  address: Joi.string().trim().required().min(2),
  mobile_1: Joi.number().required(),
  mobile_2: Joi.number(),
  whatsapp_no: Joi.number(),
  facebook: Joi.string().uri(),
  instagram: Joi.string().uri(),
  twitter: Joi.string().uri(),
  linkedin: Joi.string().uri(),
  google_map: Joi.string().uri(),
});

module.exports.deleteExperienceCentre = Joi.object({
  id: Joi.number(),
});

module.exports.getExperienceCentreById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllExperienceCentres = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateExperienceCentre = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  mobile_1: Joi.number(),
  mobile_2: Joi.number(),
  whatsapp_no: Joi.number(),
  facebook: Joi.string().uri(),
  instagram: Joi.string().uri(),
  twitter: Joi.string().uri(),
  linkedin: Joi.string().uri(),
  google_map: Joi.string().uri(),
});
