const constaints = require("../constants");
const franchiseeServices = require("../services/franchiseeServices");

// createFranchisee Controller
module.exports.createFranchisee = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.createFranchisee(
      req.body
    );
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: createFranchisee`
    );
  }
  res.status(response.status).send(response);
};

// getAllFranchisee Controller
module.exports.getAllFranchisee = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.getAllFranchisee(
      req.query
    );
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: getAllFranchisee`
    );
  }
  res.status(response.status).send(response);
};

// generateReport Controller
module.exports.generateReport = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.generateReport(
      req.query
    );
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: generateReport`
    );
  }
  res.status(response.status).send(response);
};

// getFranchiseeById Controller
module.exports.getFranchiseeById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.getFranchiseeById(
      req.params
    );
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: getFranchiseeById`
    );
  }
  res.status(response.status).send(response);
};

// deleteFranchisee Controller
module.exports.deleteFranchisee = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.deleteFranchisee(
      req.params
    );
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: deleteFranchisee`
    );
  }
  res.status(response.status).send(response);
};

// updateFranchisee Controller
module.exports.updateFranchisee = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await franchiseeServices.updateFranchisee({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.franchiseeMessage.FRANCHISEE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : franchiseeController: updateFranchisee`
    );
  }
  res.status(response.status).send(response);
};
