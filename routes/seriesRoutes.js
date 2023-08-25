const express = require("express");
const seriesRoutes = express.Router();
const seriesControllers = require("../controllers/seriesControllers");
const seriesValidationSchemas = require("../apiValidationSchemas/seriesValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createSeries
seriesRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(seriesValidationSchemas.createSeries),
  seriesControllers.createSeries
);

// getAllSeries
seriesRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(seriesValidationSchemas.getAllSeries),
  seriesControllers.getAllSeries
);

// getSeriesById
seriesRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(seriesValidationSchemas.getSeriesById),
  validateAdminToken,
  seriesControllers.getSeriesById
);

// deleteSeries
seriesRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(seriesValidationSchemas.deleteSeries),
  validateAdminToken,
  seriesControllers.deleteSeries
);

// updateSeries
seriesRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(seriesValidationSchemas.updateSeries),
  validateAdminToken,
  seriesControllers.updateSeries
);

module.exports = seriesRoutes;
