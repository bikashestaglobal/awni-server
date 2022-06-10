const Joi = require("joi");

module.exports.createProduct = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  par_cat_id: Joi.number().required(),
  cat_id: Joi.number().required(),
  child_cat_id: Joi.number().required(),
  range_id: Joi.number().required(),
  mrp: Joi.number().required(),
  selling_price: Joi.number().required(),
  default_image: Joi.string().required(),
  size: Joi.string(),
  material: Joi.string(),
  weight: Joi.string(),
  code: Joi.string(),
  description: Joi.string().required(),
});

module.exports.deleteProduct = Joi.object({
  id: Joi.number(),
});

module.exports.getProductById = Joi.object({
  id: Joi.number(),
});

module.exports.getProductBySlug = Joi.object({
  slug: Joi.string(),
});

module.exports.getAllProducts = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  parCatSlug: Joi.string(),
  subCatSlug: Joi.string(),
  childCatSlug: Joi.string(),
  range_id: Joi.string(),
  min: Joi.number(),
  max: Joi.number(),
  status: Joi.string(),
  query: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});

module.exports.updateProduct = Joi.object({
  name: Joi.string().trim().min(2),
  slug: Joi.string().trim().min(2),
  par_cat_id: Joi.number(),
  cat_id: Joi.number(),
  child_cat_id: Joi.number(),
  mrp: Joi.number(),
  selling_price: Joi.number(),
  size: Joi.string(),
  status: Joi.boolean(),
  material: Joi.string(),
  range_id: Joi.number(),
  code: Joi.string(),
  weight: Joi.string(),
  description: Joi.string(),
  default_image: Joi.string(),
});
