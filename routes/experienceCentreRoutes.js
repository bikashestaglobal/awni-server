const express = require("express");
const exprerienceCentreRoutes = express.Router();
const experienceCentreControllers = require("../controllers/experienceCentreControllers");
const experienceCentreValidationSchema = require("../apiValidationSchemas/experienceCentreValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createExperienceCentre Routes
exprerienceCentreRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    experienceCentreValidationSchema.createExperienceCentre
  ),
  experienceCentreControllers.createExperienceCentre
);

// getAllExperienceCentres Routes
exprerienceCentreRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    experienceCentreValidationSchema.getAllExperienceCentres
  ),
  experienceCentreControllers.getAllExperienceCentres
);

// getExperienceCentreById Routes
exprerienceCentreRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    experienceCentreValidationSchema.getExperienceCentreById
  ),
  experienceCentreControllers.getExperienceCentreById
);

// deleteExperienceCentre Routes
exprerienceCentreRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    experienceCentreValidationSchema.deleteExperienceCentre
  ),
  validateAdminToken,
  experienceCentreControllers.deleteExperienceCentre
);

// updateExperienceCentre Routes
exprerienceCentreRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    experienceCentreValidationSchema.updateExperienceCentre
  ),
  experienceCentreControllers.updateExperienceCentre
);

module.exports = exprerienceCentreRoutes;
