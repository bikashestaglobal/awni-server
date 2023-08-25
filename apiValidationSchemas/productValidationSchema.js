const Joi = require("joi");

module.exports.createProduct = Joi.object({
  name: Joi.string().trim().required().min(2),
  slug: Joi.string().trim().required().min(2),
  par_cat_id: Joi.number().required(),
  cat_id: Joi.number().required(),
  child_cat_id: Joi.string().allow(""),
  range_id: Joi.number().required(),
  mrp: Joi.number().required(),
  selling_price: Joi.number().required(),
  default_image: Joi.string().required(),
  size: Joi.string(),
  material: Joi.string(),
  weight: Joi.string(),
  code: Joi.string(),
  description: Joi.string().required(),

  nature_id: Joi.number(),
  surface_id: Joi.number(),
  series_id: Joi.number(),
  shape_id: Joi.number(),
  pattern_id: Joi.number(),
  application_area: Joi.string().allow(""),
  brand: Joi.string().allow(""),
  concept: Joi.string().allow(""),
  origin_country: Joi.string().allow(""),
  related_product: Joi.string().allow(""),
  pc_per_box: Joi.number(),
  covered_area: Joi.number(),
  features: Joi.string().allow(""),
  short_description: Joi.string().allow(""),
  movement: Joi.string().allow(""),
  meta_title: Joi.string().allow(""),
  meta_description: Joi.string().allow(""),
});

module.exports.createMultipleProduct = Joi.object({
  array: Joi.array().items(Joi.array()),
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
  child_cat_id: Joi.string().allow(""),
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

  nature_id: Joi.number(),
  surface_id: Joi.number(),
  series_id: Joi.number(),
  shape_id: Joi.number(),
  pattern_id: Joi.number(),
  application_area: Joi.string().allow(""),
  brand: Joi.string().allow(""),
  concept: Joi.string().allow(""),
  origin_country: Joi.string().allow(""),
  related_product: Joi.string().allow(""),
  pc_per_box: Joi.number(),
  covered_area: Joi.number(),
  features: Joi.string().allow(""),
  short_description: Joi.string().allow(""),
  movement: Joi.string().allow(""),
  meta_title: Joi.string().allow(""),
  meta_description: Joi.string().allow(""),
});
