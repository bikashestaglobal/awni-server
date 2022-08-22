const express = require("express");
const categoryRoutes = express.Router();
const parCategoryControllers = require("../controllers/parCategoryControllers");
const parCategoryValidationSchemas = require("../apiValidationSchemas/parCategoryValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createCategory Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    parCategoryValidationSchemas.createCategory
  ),
  parCategoryControllers.createCategory
);

// createMultipleCategory Routes
categoryRoutes.post(
  "/byCSV",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    parCategoryValidationSchemas.createMultipleCategory
  ),
  parCategoryControllers.createCategory
);

// getAllCategories Routes
categoryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    parCategoryValidationSchemas.getAllCategories
  ),
  parCategoryControllers.getAllCategories
);

// getAllPoducts Routes
categoryRoutes.get("/allProducts", parCategoryControllers.getAllProducts);

// getSubCategories Routes
categoryRoutes.get(
  "/allSubCategories",
  parCategoryControllers.getSubCategories
);

// getChildCategories Routes
categoryRoutes.get(
  "/allChildCategories",
  parCategoryControllers.getChildCategories
);

// getCategoryById Routes
categoryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    parCategoryValidationSchemas.getCategoryById
  ),
  parCategoryControllers.getCategoryById
);

// deleteCategory Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    parCategoryValidationSchemas.deleteCategory
  ),
  validateAdminToken,
  parCategoryControllers.deleteCategory
);

// updateCategory Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    parCategoryValidationSchemas.updateCategory
  ),
  parCategoryControllers.updateCategory
);

module.exports = categoryRoutes;
