const express = require("express");
const categoryRoutes = express.Router();
const contactUsController = require("../controllers/contactUsController");
const contactUsValidationSchema = require("../apiValidationSchemas/contactUsValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createContactUs Routes
categoryRoutes.post(
  "/",
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
  contactUsController.deleteContactUs
);

// updateContactUs Routes
categoryRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(contactUsValidationSchema.updateContactUs),
  contactUsController.updateContactUs
);

module.exports = categoryRoutes;
