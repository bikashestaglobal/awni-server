const constaints = require("../constants");
const shapeService = require("../services/shapeService");

// createShape
module.exports.createShape = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await shapeService.createShape(req.body);
    response.status = 200;
    response.message = constaints.shapeMessage.SHAPE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : shapeController: createShape`
    );
  }
  res.status(response.status).send(response);
};

// getAllShapes
module.exports.getAllShapes = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await shapeService.getAllShapes(req.query);
    response.status = 200;
    response.message = constaints.shapeMessage.SHAPE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : shapeController: getAllShapes`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
// module.exports.getAllProducts = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await shapeService.getAllProducts(req.query);
//     response.status = 200;
//     response.message = constaints.shapeMessage.PRODUCT_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : parshapeController: getAllProducts`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getShapeById
module.exports.getShapeById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await shapeService.getShapeById(req.params);
    response.status = 200;
    response.message = constaints.shapeMessage.SHAPE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : shapeController: getShapeById`
    );
  }
  res.status(response.status).send(response);
};

// deleteShape
module.exports.deleteShape = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await shapeService.deleteShape(req.params);
    response.status = 200;
    response.message = constaints.shapeMessage.SHAPE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : shapeController: deleteShape`
    );
  }
  res.status(response.status).send(response);
};

// updateShape
module.exports.updateShape = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await shapeService.updateShape({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.shapeMessage.SHAPE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : shapeController: updateShape`
    );
  }
  res.status(response.status).send(response);
};
