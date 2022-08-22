const express = require("express");
const categoryRoutes = express.Router();
const aboutUsControllers = require("../controllers/aboutUsControllers");
const aboutUsValidationSchema = require("../apiValidationSchemas/aboutUsValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createAboutUs Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(aboutUsValidationSchema.createAboutUs),
  aboutUsControllers.createAboutUs
);

// getAboutUs Routes
categoryRoutes.get("/", aboutUsControllers.getAboutUs);

// deleteAboutUs Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(aboutUsValidationSchema.deleteAboutUs),
  validateAdminToken,
  aboutUsControllers.deleteAboutUs
);

// updateAboutUs Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(aboutUsValidationSchema.updateAboutUs),
  aboutUsControllers.updateAboutUs
);

module.exports = categoryRoutes;
