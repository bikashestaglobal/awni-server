const Joi = require("joi");

module.exports.createWishlist = Joi.object({
  product_id: Joi.number(),
});

module.exports.deleteWishlist = Joi.object({
  id: Joi.number(),
});

// module.exports.getWishlistById = Joi.object({
//   id: Joi.number(),
// });

module.exports.getAllWishlists = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  customer_id: Joi.number(),
});

module.exports.myWishlists = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

// module.exports.updateWishlist = Joi.object({
//   image: Joi.string().trim(),
//   title: Joi.string().trim(),
// });
