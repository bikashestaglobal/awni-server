const express = require("express");
const natureRoutes = express.Router();
const natureControllers = require("../controllers/natureControllers");
const natureValidationSchemas = require("../apiValidationSchemas/natureValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createNature
natureRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(natureValidationSchemas.createNature),
  natureControllers.createNature
);

// getAllNatures
natureRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(natureValidationSchemas.getAllNatures),
  natureControllers.getAllNatures
);

// getNatureById
natureRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(natureValidationSchemas.getNatureById),
  validateAdminToken,
  natureControllers.getNatureById
);

// deleteNature
natureRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(natureValidationSchemas.deleteNature),
  validateAdminToken,
  natureControllers.deleteNature
);

// updateNature
natureRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(natureValidationSchemas.updateNature),
  validateAdminToken,
  natureControllers.updateNature
);

module.exports = natureRoutes;
