const Joi = require("joi");

module.exports.createPattern = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  description: Joi.string().trim().allow(""),
});

module.exports.createMultiplePattern = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deletePattern = Joi.object({
  id: Joi.number(),
});

module.exports.getPatternById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllPatterns = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
  status: Joi.string().valid("All", "true", "false"),
});

module.exports.getPatternWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updatePattern = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().trim().allow(""),
  status: Joi.boolean(),
});
