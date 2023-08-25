const Joi = require("joi");

module.exports.createSeries = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  description: Joi.string().trim().allow(""),
});

module.exports.createMultipleSeries = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deleteSeries = Joi.object({
  id: Joi.number(),
});

module.exports.getSeriesById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllSeries = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
  status: Joi.string().valid("All", "true", "false"),
});

module.exports.getSeriesWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateSeries = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  description: Joi.string().trim().allow(""),
  status: Joi.boolean(),
});
