const express = require("express");
const adminRoutes = express.Router();
const adminControllers = require("../controllers/adminControllers");
const adminValidationSchema = require("../apiValidationSchemas/adminValidationSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createAdmin Routes
adminRoutes.post(
  "/register",
  joiSchemaValidations.validateBody(adminValidationSchema.createAdmin),
  adminControllers.createAdmin
);

// getAllCategories Routes
adminRoutes.post(
  "/login",
  joiSchemaValidations.validateBody(adminValidationSchema.adminLogin),
  adminControllers.adminLogin
);

// updateAdmin Routes
adminRoutes.put(
  "/updateProfile",
  validateAdminToken,
  joiSchemaValidations.validateBody(adminValidationSchema.updateAdmin),
  adminControllers.updateAdmin
);

// findAccount Routes
adminRoutes.post(
  "/findAccount",
  joiSchemaValidations.validateBody(adminValidationSchema.findAccount),
  adminControllers.findAccount
);

// createPassword Routes
adminRoutes.put(
  "/createPassword",
  joiSchemaValidations.validateBody(adminValidationSchema.createPassword),
  adminControllers.createPassword
);

module.exports = adminRoutes;
