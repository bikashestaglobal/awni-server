const Joi = require("joi");

module.exports.createNature = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  description: Joi.string().trim().allow(""),
});

module.exports.createMultipleNature = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deleteNature = Joi.object({
  id: Joi.number(),
});

module.exports.getNatureById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllNatures = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
  status: Joi.string().valid("All", "true", "false"),
});

module.exports.getNatureWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateNature = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().trim().allow(""),
  status: Joi.boolean(),
});
