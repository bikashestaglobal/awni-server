const express = require("express");
const categoryRoutes = express.Router();
const parCategoryControllers = require("../controllers/parCategoryControllers");
const parCategoryValidationSchemas = require("../apiValidationSchemas/parCategoryValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createCategory Routes
categoryRoutes.post(
  "/",
  joiSchemaValidations.validateBody(
    parCategoryValidationSchemas.createCategory
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
  parCategoryControllers.deleteCategory
);

// updateCategory Routes
categoryRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(
    parCategoryValidationSchemas.updateCategory
  ),
  parCategoryControllers.updateCategory
);

module.exports = categoryRoutes;
