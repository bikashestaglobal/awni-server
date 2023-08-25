const constaints = require("../constants");
const surfaceServices = require("../services/surfaceServices");

// createSurface
module.exports.createSurface = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await surfaceServices.createSurface(req.body);
    response.status = 200;
    response.message = constaints.surfaceMessage.SURFACE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : surfaceController: createSurface`
    );
  }
  res.status(response.status).send(response);
};

// getAllSurfaces
module.exports.getAllSurfaces = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await surfaceServices.getAllSurfaces(req.query);
    response.status = 200;
    response.message = constaints.surfaceMessage.SURFACE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : surfaceController: getAllSurfaces`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
// module.exports.getAllProducts = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await surfaceServices.getAllProducts(req.query);
//     response.status = 200;
//     response.message = constaints.surfaceMessage.PRODUCT_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : parsurfaceController: getAllProducts`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getSurfaceById
module.exports.getSurfaceById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await surfaceServices.getSurfaceById(
      req.params
    );
    response.status = 200;
    response.message = constaints.surfaceMessage.SURFACE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : surfaceController: getSurfaceById`
    );
  }
  res.status(response.status).send(response);
};

// deleteSurface
module.exports.deleteSurface = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await surfaceServices.deleteSurface(req.params);
    response.status = 200;
    response.message = constaints.surfaceMessage.SURFACE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : surfaceController: deleteSurface`
    );
  }
  res.status(response.status).send(response);
};

// updateSurface
module.exports.updateSurface = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await surfaceServices.updateSurface({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.surfaceMessage.SURFACE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : surfaceController: updateSurface`
    );
  }
  res.status(response.status).send(response);
};
