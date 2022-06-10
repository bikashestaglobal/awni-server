const constaints = require("../constants");
const enquiryServices = require("../services/enquiryServices");

// createEnquiry Controller
module.exports.createEnquiry = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.createEnquiry(req.body);
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: createEnquiry`
    );
  }
  res.status(response.status).send(response);
};

// getAllEnquiries Controller
module.exports.getAllEnquiries = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.getAllEnquiries(
      req.query
    );
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: getAllEnquiries`
    );
  }
  res.status(response.status).send(response);
};

// generateReport Controller
module.exports.generateReport = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.generateReport(req.query);
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: generateReport`
    );
  }
  res.status(response.status).send(response);
};

// getEnquiryById Controller
module.exports.getEnquiryById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.getEnquiryById(
      req.params
    );
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: getEnquiryById`
    );
  }
  res.status(response.status).send(response);
};

// deleteEnquiry Controller
module.exports.deleteEnquiry = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.deleteEnquiry(req.params);
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: deleteEnquiry`
    );
  }
  res.status(response.status).send(response);
};

// updateEnquiry Controller
module.exports.updateEnquiry = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await enquiryServices.updateEnquiry({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.enquiryMessage.ENQUIRY_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : enquiryController: updateEnquiry`
    );
  }
  res.status(response.status).send(response);
};
