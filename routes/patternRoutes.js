const express = require("express");
const patternRoutes = express.Router();
const patternControllers = require("../controllers/patternControllers");
const patternValidationSchemas = require("../apiValidationSchemas/patternValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createPattern
patternRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(patternValidationSchemas.createPattern),
  patternControllers.createPattern
);

// getAllPatterns
patternRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(patternValidationSchemas.getAllPatterns),
  patternControllers.getAllPatterns
);

// getPatternById
patternRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(patternValidationSchemas.getPatternById),
  validateAdminToken,
  patternControllers.getPatternById
);

// deletePattern
patternRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(patternValidationSchemas.deletePattern),
  validateAdminToken,
  patternControllers.deletePattern
);

// updatePattern
patternRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(patternValidationSchemas.updatePattern),
  validateAdminToken,
  patternControllers.updatePattern
);

module.exports = patternRoutes;
