const express = require("express");
const customerControllers = require("../controllers/customerControllers");
const customerValidationSchema = require("../apiValidationSchemas/customerValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidations");
const {
  validateCustomerToken,
  validateAdminToken,
} = require("../middlewares/jwtValidation");

const customerRouter = express.Router();
// Registration Routes
customerRouter.post(
  "/register",
  joiSchemaValidation.validateBody(customerValidationSchema.register),
  customerControllers.register
);

// socialRegistration Routes
customerRouter.post(
  "/socialRegistration",
  joiSchemaValidation.validateBody(customerValidationSchema.socialRegistration),
  customerControllers.socialRegistration
);

// verifyAccount Routes
customerRouter.post("/verify", customerControllers.verifyAccount);

// Login Routes
customerRouter.post(
  "/login",
  joiSchemaValidation.validateBody(customerValidationSchema.login),
  customerControllers.login
);
// findAccount Routes
customerRouter.post(
  "/findAccount",
  joiSchemaValidation.validateBody(customerValidationSchema.findAccount),
  customerControllers.findAccount
);

// createNewPassword Routes
customerRouter.put(
  "/createNewPassword/:id",
  joiSchemaValidation.validateBody(customerValidationSchema.createNewPassword),
  customerControllers.createNewPassword
);

// resendOTP Routes
customerRouter.post(
  "/resendOTP",
  joiSchemaValidation.validateBody(customerValidationSchema.resendOTP),
  customerControllers.resendOTP
);

// myProfile Routes
customerRouter.get(
  "/myProfile",
  validateCustomerToken,
  customerControllers.myProfile
);

// updateProfile Routes
customerRouter.put(
  "/updateProfile",
  validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.updateProfile),
  customerControllers.updateProfile
);

// updateCustomer Routes
customerRouter.put(
  "/:id",
  // validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.updateCustomer),
  customerControllers.updateCustomer
);

// Login Routes
// customerRouter.post(
//   "/walletTransaction",
//   validateCustomerToken,
//   joiSchemaValidation.validateBody(walletValidationSchema.createTransaction),
//   customerControllers.createWalletTransaction
// );

// getAllCustomer
customerRouter.get(
  "/",
  validateAdminToken,
  joiSchemaValidation.validateQuery(customerValidationSchema.getAllCustomers),
  customerControllers.getAllCustomers
);

// getCustomerById
customerRouter.get(
  "/:id",
  validateAdminToken,
  customerControllers.getCustomerById
);

// deleteCustomer
customerRouter.delete(
  "/:id",
  validateAdminToken,
  customerControllers.deleteCustomer
);

// Profile Routes
// customerRouter.get(
//   "/profile",
//   validateCustomerToken,
//   customerControllers.getProfile
// );

// Update Profile Routes
// customerRouter.put(
//   "/profile",
//   validateCustomerToken,
//   joiSchemaValidation.validateBody(customerValidationSchema.updateProfile),
//   customerControllers.updateProfile
// );
// Add Address Routes
// customerRouter.post(
//   "/address",
//   validateCustomerToken,
//   joiSchemaValidation.validateBody(customerValidationSchema.addAddress),
//   customerControllers.addAddress
// );

// Update Address Routes
// customerRouter.put(
//   "/address/:id",
//   validateCustomerToken,
//   joiSchemaValidation.validateBody(customerValidationSchema.addAddress),
//   customerControllers.updateAddress
// );

// Get Address Routes
// customerRouter.get(
//   "/address/:id",
//   validateCustomerToken,
//   customerControllers.getAddressById
// );

// Delete Address Routes
// customerRouter.delete(
//   "/address/:id",
//   validateCustomerToken,
//   customerControllers.deleteAddress
// );

module.exports = customerRouter;
