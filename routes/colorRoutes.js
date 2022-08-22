const express = require("express");
const colorRoutes = express.Router();
const colorControllers = require("../controllers/colorControllers");
const ColorValidationSchemas = require("../apiValidationSchemas/colorValidationSchemas");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createColor Routes
colorRoutes.post(
  "/",
  validateAdminToken,
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
  validateAdminToken,
  colorControllers.deleteColor
);

// updateColor Routes
colorRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(ColorValidationSchemas.updateColor),
  colorControllers.updateColor
);

module.exports = colorRoutes;
