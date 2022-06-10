const express = require("express");
const rangeRoutes = express.Router();
const rangeControllers = require("../controllers/rangeControllers");
const rangeValidationSchemas = require("../apiValidationSchemas/rangeValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createRange Routes
rangeRoutes.post(
  "/",
  joiSchemaValidations.validateBody(rangeValidationSchemas.createRange),
  rangeControllers.createRange
);

// getAllRanges Routes
rangeRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(rangeValidationSchemas.getAllRanges),
  rangeControllers.getAllRanges
);

// getRangeById Routes
rangeRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(rangeValidationSchemas.getRangeById),
  rangeControllers.getRangeById
);

// deleteRange Routes
rangeRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(rangeValidationSchemas.deleteRange),
  rangeControllers.deleteRange
);

// updateRange Routes
rangeRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(rangeValidationSchemas.updateRange),
  rangeControllers.updateRange
);

module.exports = rangeRoutes;
