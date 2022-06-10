const Joi = require("joi");

module.exports.createWhyAwni = Joi.object({
  image: Joi.string().trim().uri(),
  title: Joi.string().trim(),
});

module.exports.deleteWhyAwni = Joi.object({
  id: Joi.number(),
});

module.exports.getWhyAwniById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllWhyAwnis = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateWhyAwni = Joi.object({
  image: Joi.string().trim(),
  title: Joi.string().trim(),
});
