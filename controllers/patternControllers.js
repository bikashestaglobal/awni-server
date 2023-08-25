const constaints = require("../constants");
const patternServices = require("../services/patternServices");

// createPattern
module.exports.createPattern = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await patternServices.createPattern(req.body);
    response.status = 200;
    response.message = constaints.patternMessage.PATTERN_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : patternController: createPattern`
    );
  }
  res.status(response.status).send(response);
};

// getAllPatterns
module.exports.getAllPatterns = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await patternServices.getAllPatterns(req.query);
    response.status = 200;
    response.message = constaints.patternMessage.PATTERN_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : patternController: getAllPatterns`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
// module.exports.getAllProducts = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await patternServices.getAllProducts(req.query);
//     response.status = 200;
//     response.message = constaints.patternMessage.PRODUCT_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : parpatternController: getAllProducts`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getPatternById
module.exports.getPatternById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await patternServices.getPatternById(
      req.params
    );
    response.status = 200;
    response.message = constaints.patternMessage.PATTERN_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : patternController: getPatternById`
    );
  }
  res.status(response.status).send(response);
};

// deletePattern
module.exports.deletePattern = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await patternServices.deletePattern(req.params);
    response.status = 200;
    response.message = constaints.patternMessage.PATTERN_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : patternController: deletePattern`
    );
  }
  res.status(response.status).send(response);
};

// updatePattern
module.exports.updatePattern = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await patternServices.updatePattern({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.patternMessage.PATTERN_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : patternController: updatePattern`
    );
  }
  res.status(response.status).send(response);
};
