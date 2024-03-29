const constaints = require("../constants");
const adminServices = require("../services/adminServices");
const helpers = require("../helpers");
// createAdmin Controller
module.exports.createAdmin = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await adminServices.createAdmin(req.body);
    response.status = 200;
    response.message = constaints.adminMessage.ADMIN_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : adminController: createAdmin`
    );
  }
  res.status(response.status).send(response);
};

// adminLogin Controller
module.exports.adminLogin = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await adminServices.adminLogin(req.body);
    response.status = 200;
    response.message = constaints.adminMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : adminController: adminLogin`
    );
  }
  res.status(response.status).send(response);
};

// updateAdmin Controller
module.exports.updateAdmin = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await adminServices.updateAdmin({
      id: req.params.adminId,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.adminMessage.ADMIN_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : adminController: updateAdmin`
    );
  }
  res.status(response.status).send(response);
};

// findAccount Controller
module.exports.findAccount = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  const otp = helpers.generateOTP();
  try {
    const responseFromService = await adminServices.findAccount({
      ...req.body,
      otp,
    });
    response.status = 200;
    response.message = constaints.adminMessage.ADMIN_FETCHED;
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

// createPassword Controller
module.exports.createPassword = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await adminServices.createPassword({
      email: req.body.email,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.adminMessage.ADMIN_PASSWORD_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : adminController: createPassword`
    );
  }
  res.status(response.status).send(response);
};
