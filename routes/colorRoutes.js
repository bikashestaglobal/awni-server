const express = require("express");
const colorRoutes = express.Router();
const colorControllers = require("../controllers/colorControllers");
const ColorValidationSchemas = require("../apiValidationSchemas/colorValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createColor Routes
colorRoutes.post(
  "/",
  joiSchemaValidations.validateBody(ColorValidationSchemas.createColor),
  colorControllers.createColor
);

// getAllColors Routes
colorRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(ColorValidationSchemas.getAllColors),
  colorControllers.getAllColors
);

// getColorById Routes
colorRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(ColorValidationSchemas.getColorById),
  colorControllers.getColorById
);

// deleteColor Routes
colorRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(ColorValidationSchemas.deleteColor),
  colorControllers.deleteColor
);

// updateColor Routes
colorRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(ColorValidationSchemas.updateColor),
  colorControllers.updateColor
);

module.exports = colorRoutes;
