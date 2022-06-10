const customerServices = require("../services/customerServices");
const constants = require("../constants");
const helpers = require("../helpers");

// Registration Controller
module.exports.register = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  // Generate otp
  const otp = helpers.generateOTP();
  try {
    // generate OTP

    const responseFromService = await customerServices.register({
      ...req.body,
      otp,
    });
    response.status = 200;
    response.message = `${constants.customerMessage.CUSTOMER_CREATED} Needs to Verify First Please Check Your Email`;
    response.body = responseFromService;
    response.body.otp = otp;
  } catch (error) {
    if (error.message === "Error: Need Login") {
      response.message = "Your Account Exists, Need Login";
      response.status = 302;
    }
    if (error.message === "Error: Need Verification") {
      response.status = 401;
      response.message = "Your Account Exists, Need Verification";
      response.body = { otp, email: req.body.email, name: req.body.name };
    }
  }

  res.status(response.status).send(response);
};

// socialRegistration Controller
module.exports.socialRegistration = async (req, res) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await customerServices.socialRegistration({
      ...req.body,
    });
    response.status = 200;
    response.message = "Registration Done !";
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.status = 400;
  }

  res.status(response.status).send(response);
};

// Account Verification Controller
module.exports.verifyAccount = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.verifyAccount(req.body);
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_VERIFIED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Login Controller
module.exports.login = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  const otp = helpers.generateOTP();
  try {
    const responseFromService = await customerServices.login({
      ...req.body,
      otp,
    });
    response.status = 200;
    response.message = constants.authMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    if (error.message === "Need Verification") {
      response.status = 401;
      response.message = "Your Account Exists, Need Verification";
      response.body = { otp, email: req.body.email };
    } else if (error.message === "Account Disabled") {
      response.message = "Your Account is Permanent Disabled";
      response.status = 403;
    } else {
      response.message = error.message;
    }
  }
  res.status(response.status).send(response);
};

// findAccount Controller
module.exports.findAccount = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  const otp = helpers.generateOTP();
  try {
    const responseFromService = await customerServices.findAccount({
      ...req.body,
      otp,
    });
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = {
      ...responseFromService,
      otp,
    };
  } catch (error) {
    response.message = error.message;
    response.errors.email = error.message;
  }
  res.status(response.status).send(response);
};

// getAllCustomers Controller
module.exports.getAllCustomers = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.getAllCustomers(
      req.query
    );
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerControllers : getAllCustomers`
    );
  }
  res.status(response.status).send(response);
};

// getCustomerById Controller
module.exports.getCustomerById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.getCustomerById(
      req.params
    );
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerControllers : getCustomerById`
    );
  }
  res.status(response.status).send(response);
};

// myProfile Controller
module.exports.myProfile = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.myProfile(req.params);
    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerControllers : myProfile`
    );
  }
  res.status(response.status).send(response);
};

// Update Profile Controller
module.exports.updateProfile = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.updateProfile({
      id: req.params.customerId,
      body: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_UPDATE;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  updateProfile`
    );
  }
  res.status(response.status).send(response);
};

// Update Customer Controller
module.exports.updateCustomer = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.updateCustomer({
      id: req.params.id,
      body: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_UPDATE;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  updateCustomer`
    );
  }
  res.status(response.status).send(response);
};

// Add Address Controller
module.exports.addAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.addAddress({
      id: req.params.customerId,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_ADDED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  addAddress`
    );
  }
  res.status(response.status).send(response);
};

// createWalletTransaction
module.exports.createWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.createWalletTransaction({
      customerId: req.params.customerId,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.TRANSACTION_ADDED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  createWalletTransaction`
    );
  }
  res.status(response.status).send(response);
};

// getAddress Controller
module.exports.getAddressById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.getAddressById({
      id: req.params.customerId,
      addressId: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  getAddress`
    );
  }
  res.status(response.status).send(response);
};

// Delete Address Controller
module.exports.deleteAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.deleteAddress({
      customerId: req.params.customerId,
      addressId: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  deleteAddress`
    );
  }
  res.status(response.status).send(response);
};

// Add Address Controller
module.exports.updateAddress = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.updateAddress({
      id: req.params.customerId,
      addressId: req.params.id,
      data: req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.ADDRESS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  updateAddress`
    );
  }
  res.status(response.status).send(response);
};

// deleteCustomer Controller
module.exports.deleteCustomer = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.deleteCustomer({
      id: req.params.id,
    });

    response.status = 200;
    response.message = constants.customerMessage.CUSTOMER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  deleteCustomer`
    );
  }
  res.status(response.status).send(response);
};

// createNewPassword Controller
module.exports.createNewPassword = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.createNewPassword({
      id: req.params.id,
      ...req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.PASSWORD_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  createNewPassword`
    );
  }
  res.status(response.status).send(response);
};

// resendOTP Controller
module.exports.resendOTP = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await customerServices.resendOTP({
      ...req.body,
    });

    response.status = 200;
    response.message = constants.customerMessage.OTP_SEND;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : customerController:  resendOTP`
    );
  }
  res.status(response.status).send(response);
};
