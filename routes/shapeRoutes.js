const express = require("express");
const shapeRoutes = express.Router();
const shapeControllers = require("../controllers/shapeControllers");
const shapeValidationSchemas = require("../apiValidationSchemas/shapeValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createShape
shapeRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(shapeValidationSchemas.createShape),
  shapeControllers.createShape
);

// getAllShapes
shapeRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(shapeValidationSchemas.getAllShapes),
  shapeControllers.getAllShapes
);

// getShapeById
shapeRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(shapeValidationSchemas.getShapeById),
  validateAdminToken,
  shapeControllers.getShapeById
);

// deleteShape
shapeRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(shapeValidationSchemas.deleteShape),
  validateAdminToken,
  shapeControllers.deleteShape
);

// updateShape
shapeRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(shapeValidationSchemas.updateShape),
  validateAdminToken,
  shapeControllers.updateShape
);

module.exports = shapeRoutes;
