const Joi = require("joi");

module.exports.createProductImage = Joi.object({
  product_id: Joi.number().required(),
  urls: Joi.array().required(),
});

module.exports.deleteProductImage = Joi.object({
  id: Joi.number(),
});

module.exports.deleteProductImageByProductId = Joi.object({
  product_id: Joi.number(),
});

module.exports.getProductImageById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllProductImages = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  product_id: Joi.number(),
});

module.exports.updateProductImage = Joi.object({
  product_id: Joi.number(),
  urls: Joi.array().required(),
});
