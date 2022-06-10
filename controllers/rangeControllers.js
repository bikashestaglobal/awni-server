const constaints = require("../constants");
const rangeServices = require("../services/rangeServices");

// createRange Controller
module.exports.createRange = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await rangeServices.createRange(req.body);
    response.status = 200;
    response.message = constaints.rangeMessage.RANGE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : rangeController: createRange`
    );
  }
  res.status(response.status).send(response);
};

// getAllRanges Controller
module.exports.getAllRanges = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await rangeServices.getAllRanges(req.query);
    response.status = 200;
    response.message = constaints.rangeMessage.RANGE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : rangeController: getAllRanges`
    );
  }
  res.status(response.status).send(response);
};

// getRangeById Controller
module.exports.getRangeById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await rangeServices.getRangeById(req.params);
    response.status = 200;
    response.message = constaints.rangeMessage.RANGE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : rangeController: getRangeById`
    );
  }
  res.status(response.status).send(response);
};

// deleteRange Controller
module.exports.deleteRange = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await rangeServices.deleteRange(req.params);
    response.status = 200;
    response.message = constaints.rangeMessage.RANGE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : rangeController: deleteRange`
    );
  }
  res.status(response.status).send(response);
};

// updateRange Controller
module.exports.updateRange = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await rangeServices.updateRange({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.rangeMessage.RANGE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : rangeController: updateRange`
    );
  }
  res.status(response.status).send(response);
};
