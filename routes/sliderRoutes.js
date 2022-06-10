const express = require("express");
const whyAwniRoutes = express.Router();
const sliderControllers = require("../controllers/sliderControllers");
const sliderValidationSchema = require("../apiValidationSchemas/sliderValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createSlider Routes
whyAwniRoutes.post(
  "/",
  joiSchemaValidations.validateBody(sliderValidationSchema.createSlider),
  sliderControllers.createSlider
);

// getAllSliders Routes
whyAwniRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(sliderValidationSchema.getAllSliders),
  sliderControllers.getAllSliders
);

// getSliderById Routes
whyAwniRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(sliderValidationSchema.getSliderById),
  sliderControllers.getSliderById
);

// deleteSlider Routes
whyAwniRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(sliderValidationSchema.deleteSlider),
  sliderControllers.deleteSlider
);

// updateSlider Routes
whyAwniRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(sliderValidationSchema.updateSlider),
  sliderControllers.updateSlider
);

module.exports = whyAwniRoutes;
