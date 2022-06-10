const constaints = require("../constants");
const aboutUsServices = require("../services/aboutUsServices");

// createAboutUs Controller
module.exports.createAboutUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await aboutUsServices.createAboutUs(req.body);
    response.status = 200;
    response.message = constaints.aboutUsMessage.ABOUTUS_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : aboutUsController: createAboutUs`
    );
  }
  res.status(response.status).send(response);
};

// getAboutUs Controller
module.exports.getAboutUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await aboutUsServices.getAboutUs(req.query);
    response.status = 200;
    response.message = constaints.aboutUsMessage.ABOUTUS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : aboutUsController: getAboutUs`
    );
  }
  res.status(response.status).send(response);
};

// deleteAboutUs Controller
module.exports.deleteAboutUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await aboutUsServices.deleteAboutUs(req.params);
    response.status = 200;
    response.message = constaints.aboutUsMessage.ABOUTUS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : aboutUsController: deleteAboutUs`
    );
  }
  res.status(response.status).send(response);
};

// updateAboutUs Controller
module.exports.updateAboutUs = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await aboutUsServices.updateAboutUs({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.aboutUsMessage.ABOUTUS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : aboutUsController: updateAboutUs`
    );
  }
  res.status(response.status).send(response);
};
