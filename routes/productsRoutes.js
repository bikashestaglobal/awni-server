const express = require("express");
const productRoutes = express.Router();
const productControllers = require("../controllers/productControllers");
const productValidationSchema = require("../apiValidationSchemas/productValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createProduct Routes
productRoutes.post(
  "/",
  joiSchemaValidations.validateBody(productValidationSchema.createProduct),
  productControllers.createProduct
);

// createMultipleProduct Routes
productRoutes.post(
  "/byCSV",
  joiSchemaValidations.validateBody(
    productValidationSchema.createMultipleProduct
  ),
  productControllers.createProduct
);

// getProductWithColorImages Routes
productRoutes.get(
  "/withColorAndImages",
  productControllers.getProductWithColorImages
);

// getAllProducts Routes
productRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(productValidationSchema.getAllProducts),
  productControllers.getAllProducts
);

// getProductBySlug Routes
productRoutes.get(
  "/getBySlug/:slug",
  joiSchemaValidations.validateParams(productValidationSchema.getProductBySlug),
  productControllers.getProductBySlug
);

// getProductById Routes
productRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(productValidationSchema.getProductById),
  productControllers.getProductById
);

// deleteProduct Routes
productRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(productValidationSchema.deleteProduct),
  productControllers.deleteProduct
);

// updateProduct Routes
productRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(productValidationSchema.updateProduct),
  productControllers.updateProduct
);

module.exports = productRoutes;
