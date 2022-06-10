const constaints = require("../constants");
const contactUsService = require("../services/contactUsService");

// createContactUs Controller
module.exports.createContactUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await contactUsService.createContactUs(
      req.body
    );
    response.status = 200;
    response.message = constaints.contactUsMessage.CONTACTUS_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : contactUsController: createContactUs`
    );
  }
  res.status(response.status).send(response);
};

// getContactUs Controller
module.exports.getContactUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await contactUsService.getContactUs(req.query);
    response.status = 200;
    response.message = constaints.contactUsMessage.CONTACTUS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : contactUsController: getContactUs`
    );
  }
  res.status(response.status).send(response);
};

// deleteContactUs Controller
module.exports.deleteContactUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await contactUsService.deleteContactUs(
      req.params
    );
    response.status = 200;
    response.message = constaints.contactUsMessage.CONTACTUS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : contactUsController: deleteContactUs`
    );
  }
  res.status(response.status).send(response);
};

// updateContactUs Controller
module.exports.updateContactUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await contactUsService.updateContactUs({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.contactUsMessage.CONTACTUS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : contactUsController: updateContactUs`
    );
  }
  res.status(response.status).send(response);
};
