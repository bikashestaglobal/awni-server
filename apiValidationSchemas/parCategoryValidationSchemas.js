const Joi = require("joi");

module.exports.createCategory = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  image: Joi.string().trim().required(),
});

module.exports.createMultipleCategory = Joi.object({
  array: Joi.array().items(Joi.array()),
});

module.exports.deleteCategory = Joi.object({
  id: Joi.number(),
});

module.exports.getCategoryById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllCategories = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
});

module.exports.updateCategory = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  image: Joi.string().trim(),
});
