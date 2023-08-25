const constaints = require("../constants");
const natureServices = require("../services/natureServices");

// createNature
module.exports.createNature = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await natureServices.createNature(req.body);
    response.status = 200;
    response.message = constaints.natureMessage.NATURE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : natureController: createNature`
    );
  }
  res.status(response.status).send(response);
};

// getAllNatures
module.exports.getAllNatures = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await natureServices.getAllNatures(req.query);
    response.status = 200;
    response.message = constaints.natureMessage.NATURE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : natureController: getAllNatures`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
// module.exports.getAllProducts = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await natureServices.getAllProducts(req.query);
//     response.status = 200;
//     response.message = constaints.natureMessage.PRODUCT_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : parnatureController: getAllProducts`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getNatureById
module.exports.getNatureById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await natureServices.getNatureById(req.params);
    response.status = 200;
    response.message = constaints.natureMessage.NATURE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : natureController: getNatureById`
    );
  }
  res.status(response.status).send(response);
};

// deleteNature
module.exports.deleteNature = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await natureServices.deleteNature(req.params);
    response.status = 200;
    response.message = constaints.natureMessage.NATURE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : natureController: deleteNature`
    );
  }
  res.status(response.status).send(response);
};

// updateNature
module.exports.updateNature = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await natureServices.updateNature({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.natureMessage.NATURE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : natureController: updateNature`
    );
  }
  res.status(response.status).send(response);
};
