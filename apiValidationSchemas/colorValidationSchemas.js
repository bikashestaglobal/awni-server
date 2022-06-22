const Joi = require("joi");

module.exports.createColor = Joi.object({
  name: [Joi.string(), Joi.array()],
});

module.exports.deleteColor = Joi.object({
  id: Joi.number(),
});

module.exports.getColorById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllColors = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
});

module.exports.updateColor = Joi.object({
  name: Joi.string(),
});
