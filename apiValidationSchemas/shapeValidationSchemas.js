const Joi = require("joi");

module.exports.createShape = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  description: Joi.string().trim().allow(""),
});

module.exports.createMultipleShape = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deleteShape = Joi.object({
  id: Joi.number(),
});

module.exports.getShapeById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllShapes = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
  status: Joi.string().valid("All", "true", "false"),
});

module.exports.getShapeWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateShape = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().trim().allow(""),
  status: Joi.boolean(),
});
