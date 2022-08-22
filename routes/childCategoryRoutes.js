const express = require("express");
const categoryRoutes = express.Router();
const childCategoryControllers = require("../controllers/childCategoryControllers");
const childCategoryValidationSchemas = require("../apiValidationSchemas/childCategoryValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createCategory Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    childCategoryValidationSchemas.createCategory
  ),
  childCategoryControllers.createCategory
);

// createMultipleCategory Routes
categoryRoutes.post(
  "/byCSV",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    childCategoryValidationSchemas.createMultipleCategory
  ),
  childCategoryControllers.createCategory
);

// getAllCategories Routes
categoryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    childCategoryValidationSchemas.getAllCategories
  ),
  childCategoryControllers.getAllCategories
);

// getCategoryById Routes
categoryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    childCategoryValidationSchemas.getCategoryById
  ),
  childCategoryControllers.getCategoryById
);

// deleteCategory Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    childCategoryValidationSchemas.deleteCategory
  ),
  validateAdminToken,
  childCategoryControllers.deleteCategory
);

// updateCategory Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    childCategoryValidationSchemas.updateCategory
  ),
  childCategoryControllers.updateCategory
);

module.exports = categoryRoutes;
