const express = require("express");
const wishlistRoutes = express.Router();
const wishlistControllers = require("../controllers/wishlistControllers");
const wishlistValidationSchema = require("../apiValidationSchemas/wishlistValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateCustomerToken } = require("../middlewares/jwtValidation");
// createWishlist Routes
wishlistRoutes.post(
  "/",
  validateCustomerToken,
  joiSchemaValidations.validateBody(wishlistValidationSchema.createWishlist),
  wishlistControllers.createWishlist
);

// myWishlists Routes
wishlistRoutes.get(
  "/myWishlists",
  validateCustomerToken,
  joiSchemaValidations.validateQuery(wishlistValidationSchema.myWishlists),
  wishlistControllers.myWishlists
);

// deleteWishlist Routes
wishlistRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(wishlistValidationSchema.deleteWishlist),
  validateCustomerToken,
  wishlistControllers.deleteWishlist
);
// getAllWishlists Routes
wishlistRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(wishlistValidationSchema.getAllWishlists),
  wishlistControllers.getAllWishlists
);

// getWishlistById Routes
// wishlistRoutes.get(
//   "/:id",
//   joiSchemaValidations.validateParams(wishlistValidationSchema.getWishlistById),
//   wishlistControllers.getWishlistById
// );

module.exports = wishlistRoutes;
