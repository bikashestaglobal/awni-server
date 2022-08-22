const express = require("express");
const categoryRoutes = express.Router();
const categoryControllers = require("../controllers/categoryControllers");
const categoryValidationSchemas = require("../apiValidationSchemas/categoryValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createCategory Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(categoryValidationSchemas.createCategory),
  categoryControllers.createCategory
);

// createMultipleCategory Routes
categoryRoutes.post(
  "/byCSV",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    categoryValidationSchemas.createMultipleCategory
  ),
  categoryControllers.createCategory
);

// getAllCategories Routes
categoryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    categoryValidationSchemas.getAllCategories
  ),
  categoryControllers.getAllCategories
);

// getCategoryById Routes
categoryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    categoryValidationSchemas.getCategoryById
  ),
  categoryControllers.getCategoryById
);

// deleteCategory Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(categoryValidationSchemas.deleteCategory),
  validateAdminToken,
  categoryControllers.deleteCategory
);

// updateCategory Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(categoryValidationSchemas.updateCategory),
  categoryControllers.updateCategory
);

module.exports = categoryRoutes;
