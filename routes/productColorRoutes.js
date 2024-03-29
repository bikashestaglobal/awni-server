const express = require("express");
const categoryRoutes = express.Router();
const productColorControllers = require("../controllers/productColorControllers");
const productColorValidationSchemas = require("../apiValidationSchemas/productColorValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createProductColor Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    productColorValidationSchemas.createProductColor
  ),
  productColorControllers.createProductColor
);

// getAllProductColors Routes
categoryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    productColorValidationSchemas.getAllProductColors
  ),
  productColorControllers.getAllProductColors
);

// getProductColorById Routes
categoryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    productColorValidationSchemas.getProductColorById
  ),
  productColorControllers.getProductColorById
);

// deleteProductColorByProductId Routes
categoryRoutes.delete(
  "/deleteByProductId/:product_id",
  joiSchemaValidations.validateParams(
    productColorValidationSchemas.deleteProductColorByProductId
  ),
  validateAdminToken,
  productColorControllers.deleteProductColorByProductId
);

// deleteProductColor Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    productColorValidationSchemas.deleteProductColor
  ),
  validateAdminToken,
  productColorControllers.deleteProductColor
);

// updateProductColor Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    productColorValidationSchemas.updateProductColor
  ),
  productColorControllers.updateProductColor
);

module.exports = categoryRoutes;
