const express = require("express");
const franchiseeRoutes = express.Router();
const franchiseeController = require("../controllers/franchiseeController");
const franchiseeValidationSchema = require("../apiValidationSchemas/franchiseeValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createFranchisee Routes
franchiseeRoutes.post(
  "/",
  joiSchemaValidations.validateBody(
    franchiseeValidationSchema.createFranchisee
  ),
  franchiseeController.createFranchisee
);

// getAllFranchisee Routes
franchiseeRoutes.get(
  "/",
  joiSchemaValidations.validateQuery(
    franchiseeValidationSchema.getAllFranchisee
  ),
  franchiseeController.getAllFranchisee
);
// generateReport Routes
franchiseeRoutes.get(
  "/generateReport",
  joiSchemaValidations.validateQuery(franchiseeValidationSchema.generateReport),
  validateAdminToken,
  franchiseeController.generateReport
);

// getFranchiseeById Routes
franchiseeRoutes.get(
  "/:id",
  joiSchemaValidations.validateParams(
    franchiseeValidationSchema.getFranchiseeById
  ),
  validateAdminToken,
  franchiseeController.getFranchiseeById
);

// deleteFranchisee Routes
franchiseeRoutes.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    franchiseeValidationSchema.deleteFranchisee
  ),
  validateAdminToken,
  franchiseeController.deleteFranchisee
);

// updateFranchisee Routes
franchiseeRoutes.put(
  "/:id",
  validateAdminToken,
  joiSchemaValidations.validateBody(
    franchiseeValidationSchema.updateFranchisee
  ),
  franchiseeController.updateFranchisee
);

module.exports = franchiseeRoutes;
