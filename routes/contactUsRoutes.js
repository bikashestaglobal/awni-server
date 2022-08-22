const express = require("express");
const categoryRoutes = express.Router();
const contactUsController = require("../controllers/contactUsController");
const contactUsValidationSchema = require("../apiValidationSchemas/contactUsValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createContactUs Routes
categoryRoutes.post(
  "/",
  validateAdminToken,
  joiSchemaValidations.validateBody(contactUsValidationSchema.createContactUs),
  contactUsController.createContactUs
);

// getContactUs Routes
categoryRoutes.get("/", contactUsController.getContactUs);

// deleteContactUs Routes
categoryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    contactUsValidationSchema.deleteContactUs
  ),
  validateAdminToken,
  contactUsController.deleteContactUs
);

// updateContactUs Routes
categoryRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(contactUsValidationSchema.updateContactUs),
  contactUsController.updateContactUs
);

module.exports = categoryRoutes;
