const express = require("express");
const categoryRoutes = express.Router();
const productImageControllers = require("../controllers/productImageControllers");
const productImageValidationSchema = require("../apiValidationSchemas/productImageValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createProductImage Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    productImageValidationSchema.createProductImage
  ),
  productImageControllers.createProductImage
);

// getAllProductImages Routes
categoryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    productImageValidationSchema.getAllProductImages
  ),
  productImageControllers.getAllProductImages
);

// getProductImageById Routes
categoryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    productImageValidationSchema.getProductImageById
  ),
  productImageControllers.getProductImageById
);

// deleteProductImageByProductId Routes
categoryRoutes.delete(
  "/deleteByProductId/:product_id",
  joiSchemaValidations.validateParams(
    productImageValidationSchema.deleteProductImageByProductId
  ),
  productImageControllers.deleteProductImageByProductId
);

// deleteProductImage Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    productImageValidationSchema.deleteProductImage
  ),
  productImageControllers.deleteProductImage
);

// updateProductImage Routes
categoryRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(
    productImageValidationSchema.updateProductImage
  ),
  productImageControllers.updateProductImage
);

module.exports = categoryRoutes;
