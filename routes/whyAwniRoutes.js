const express = require("express");
const whyAwniRoutes = express.Router();
const whyAwniControllers = require("../controllers/whyAwniControllers");
const whyAwniValidationSchema = require("../apiValidationSchemas/whyAwniValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createWhyAwni Routes
whyAwniRoutes.post(
  "/",
  joiSchemaValidations.validateBody(whyAwniValidationSchema.createWhyAwni),
  whyAwniControllers.createWhyAwni
);

// getAllWhyAwnis Routes
whyAwniRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(whyAwniValidationSchema.getAllWhyAwnis),
  whyAwniControllers.getAllWhyAwnis
);

// getWhyAwniById Routes
whyAwniRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(whyAwniValidationSchema.getWhyAwniById),
  whyAwniControllers.getWhyAwniById
);

// deleteWhyAwni Routes
whyAwniRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(whyAwniValidationSchema.deleteWhyAwni),
  whyAwniControllers.deleteWhyAwni
);

// updateWhyAwni Routes
whyAwniRoutes.put(
  "/:id",
  joiSchemaValidations.validateBody(whyAwniValidationSchema.updateWhyAwni),
  whyAwniControllers.updateWhyAwni
);

module.exports = whyAwniRoutes;
