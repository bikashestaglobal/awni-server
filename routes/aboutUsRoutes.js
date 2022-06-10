const express = require("express");
const categoryRoutes = express.Router();
const aboutUsControllers = require("../controllers/aboutUsControllers");
const aboutUsValidationSchema = require("../apiValidationSchemas/aboutUsValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createAboutUs Routes
categoryRoutes.post(
  "/",
  joiSchemaValidations.validateBody(aboutUsValidationSchema.createAboutUs),
  aboutUsControllers.createAboutUs
);

// getAboutUs Routes
categoryRoutes.get("/", aboutUsControllers.getAboutUs);

// deleteAboutUs Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(aboutUsValidationSchema.deleteAboutUs),
  aboutUsControllers.deleteAboutUs
);

// updateAboutUs Routes
categoryRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(aboutUsValidationSchema.updateAboutUs),
  aboutUsControllers.updateAboutUs
);

module.exports = categoryRoutes;
