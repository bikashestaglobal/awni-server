const express = require("express");
const surfaceRoutes = express.Router();
const surfaceControllers = require("../controllers/surfaceControllers");
const surfaceValidationSchemas = require("../apiValidationSchemas/surfaceValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createSurface
surfaceRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(surfaceValidationSchemas.createSurface),
  surfaceControllers.createSurface
);

// getAllSurfaces
surfaceRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(surfaceValidationSchemas.getAllSurfaces),
  surfaceControllers.getAllSurfaces
);

// getSurfaceById
surfaceRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(surfaceValidationSchemas.getSurfaceById),
  validateAdminToken,
  surfaceControllers.getSurfaceById
);

// deleteSurface
surfaceRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(surfaceValidationSchemas.deleteSurface),
  validateAdminToken,
  surfaceControllers.deleteSurface
);

// updateSurface
surfaceRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(surfaceValidationSchemas.updateSurface),
  validateAdminToken,
  surfaceControllers.updateSurface
);

module.exports = surfaceRoutes;
