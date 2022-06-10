const express = require("express");
const enquiryRoutes = express.Router();
const enquiryControllers = require("../controllers/enquiryControllers");
const enquiryValidationSchema = require("../apiValidationSchemas/enquiryValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createEnquiry Routes
enquiryRoutes.post(
  "/",
  joiSchemaValidations.validateBody(enquiryValidationSchema.createEnquiry),
  enquiryControllers.createEnquiry
);

// getAllEnquiries Routes
enquiryRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(enquiryValidationSchema.getAllEnquiries),
  enquiryControllers.getAllEnquiries
);
// generateReport Routes
enquiryRoutes.get(
  "/generateReport",
  joiSchemaValidations.validateQuery(enquiryValidationSchema.generateReport),
  enquiryControllers.generateReport
);

// getEnquiryById Routes
enquiryRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(enquiryValidationSchema.getEnquiryById),
  enquiryControllers.getEnquiryById
);

// deleteEnquiry Routes
enquiryRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(enquiryValidationSchema.deleteEnquiry),
  enquiryControllers.deleteEnquiry
);

// updateEnquiry Routes
enquiryRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(enquiryValidationSchema.updateEnquiry),
  enquiryControllers.updateEnquiry
);

module.exports = enquiryRoutes;
