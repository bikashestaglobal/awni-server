const Joi = require("joi");

module.exports.createCategory = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  image: Joi.string().trim(),
  catalogue: Joi.string().trim(),
  par_cat_id: Joi.number().required(),
  cat_id: Joi.number().required(),
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
  par_cat_id: Joi.number(),
  par_cat_slug: Joi.string(),
  cat_id: Joi.number(),
  cat_slug: Joi.string(),
  query: Joi.string(),
});

module.exports.getCategoryWithProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  par_cat_id: Joi.number(),
  cat_id: Joi.number(),
});

module.exports.updateCategory = Joi.object({
  name: Joi.string(),
  slug: Joi.string(),
  catalogue: Joi.string().trim(),
  image: Joi.string(),
  par_cat_id: Joi.number(),
  cat_id: Joi.number(),
});
