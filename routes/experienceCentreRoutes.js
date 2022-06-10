const express = require("express");
const exprerienceCentreRoutes = express.Router();
const experienceCentreControllers = require("../controllers/experienceCentreControllers");
const experienceCentreValidationSchema = require("../apiValidationSchemas/experienceCentreValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createExperienceCentre Routes
exprerienceCentreRoutes.post(
  "/",
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
  experienceCentreControllers.deleteExperienceCentre
);

// updateExperienceCentre Routes
exprerienceCentreRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(
    experienceCentreValidationSchema.updateExperienceCentre
  ),
  experienceCentreControllers.updateExperienceCentre
);

module.exports = exprerienceCentreRoutes;
