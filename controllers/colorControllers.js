const constaints = require("../constants");
const colorServices = require("../services/colorServices");

// createColor Controller
module.exports.createColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await colorServices.createColor(req.body);
    response.status = 200;
    response.message = constaints.colorMessage.COLOR_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : colorController: createColor`
    );
  }
  res.status(response.status).send(response);
};

// getAllColors Controller
module.exports.getAllColors = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await colorServices.getAllColors(req.query);
    response.status = 200;
    response.message = constaints.colorMessage.COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : colorController: getAllColors`
    );
  }
  res.status(response.status).send(response);
};

// getColorById Controller
module.exports.getColorById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await colorServices.getColorById(req.params);
    response.status = 200;
    response.message = constaints.colorMessage.COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : colorController: getColorById`
    );
  }
  res.status(response.status).send(response);
};

// deleteColor Controller
module.exports.deleteColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await colorServices.deleteColor(req.params);
    response.status = 200;
    response.message = constaints.colorMessage.COLOR_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : colorController: deleteColor`
    );
  }
  res.status(response.status).send(response);
};

// updateColor Controller
module.exports.updateColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await colorServices.updateColor({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.colorMessage.COLOR_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : colorController: updateColor`
    );
  }
  res.status(response.status).send(response);
};
