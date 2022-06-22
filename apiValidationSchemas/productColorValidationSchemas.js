const Joi = require("joi");

module.exports.createProductColor = Joi.object({
  product_id: Joi.number().required(),
  colors: Joi.array().required(),
});

module.exports.deleteProductColor = Joi.object({
  id: Joi.number(),
});

module.exports.deleteProductColorByProductId = Joi.object({
  product_id: Joi.number(),
});

module.exports.getProductColorById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllProductColors = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  product_id: Joi.number(),
});

module.exports.updateProductColor = Joi.object({
  product_id: Joi.number(),
  colors: Joi.array(),
});
