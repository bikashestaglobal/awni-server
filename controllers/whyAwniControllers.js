const constaints = require("../constants");
const whyAwniServices = require("../services/whyAwniServices");

// createWhyAwni Controller
module.exports.createWhyAwni = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await whyAwniServices.createWhyAwni(req.body);
    response.status = 200;
    response.message = constaints.whyAwniMessage.WHY_AWNI_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : whyAwniController: createWhyAwni`
    );
  }
  res.status(response.status).send(response);
};

// getAllWhyAwnis Controller
module.exports.getAllWhyAwnis = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await whyAwniServices.getAllWhyAwnis(req.query);
    response.status = 200;
    response.message = constaints.whyAwniMessage.WHY_AWNI_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : whyAwniController: getAllWhyAwnis`
    );
  }
  res.status(response.status).send(response);
};

// getWhyAwniById Controller
module.exports.getWhyAwniById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await whyAwniServices.getWhyAwniById(
      req.params
    );
    response.status = 200;
    response.message = constaints.whyAwniMessage.WHY_AWNI_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : whyAwniController: getWhyAwniById`
    );
  }
  res.status(response.status).send(response);
};

// deleteWhyAwni Controller
module.exports.deleteWhyAwni = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await whyAwniServices.deleteWhyAwni(req.params);
    response.status = 200;
    response.message = constaints.whyAwniMessage.WHY_AWNI_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : whyAwniController: deleteWhyAwni`
    );
  }
  res.status(response.status).send(response);
};

// updateWhyAwni Controller
module.exports.updateWhyAwni = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await whyAwniServices.updateWhyAwni({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.whyAwniMessage.WHY_AWNI_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : whyAwniController: updateWhyAwni`
    );
  }
  res.status(response.status).send(response);
};
