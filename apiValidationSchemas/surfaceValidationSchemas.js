const Joi = require("joi");

module.exports.createSurface = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  description: Joi.string().trim().allow(""),
});

module.exports.createMultipleSurface = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deleteSurface = Joi.object({
  id: Joi.number(),
});

module.exports.getSurfaceById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllSurfaces = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
  status: Joi.string().valid("All", "true", "false"),
});

module.exports.getSrfaceWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateSurface = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().trim().allow(""),
  status: Joi.boolean(),
});
