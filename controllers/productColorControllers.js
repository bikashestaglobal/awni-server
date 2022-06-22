const constaints = require("../constants");
const productColorServices = require("../services/productColorServices");

// createProductColor Controller
module.exports.createProductColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productColorServices.createProductColor(
      req.body
    );
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: createProductColor`
    );
  }
  res.status(response.status).send(response);
};

// getAllProductColors Controller
module.exports.getAllProductColors = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productColorServices.getAllProductColors(
      req.query
    );
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: getAllProductColors`
    );
  }
  res.status(response.status).send(response);
};

// getProductColorById Controller
module.exports.getProductColorById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productColorServices.getProductColorById(
      req.params
    );
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: getProductColorById`
    );
  }
  res.status(response.status).send(response);
};

// deleteProductColor Controller
module.exports.deleteProductColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productColorServices.deleteProductColor(
      req.params
    );
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: deleteProductColor`
    );
  }
  res.status(response.status).send(response);
};

// deleteProductColorByProductId Controller
module.exports.deleteProductColorByProductId = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await productColorServices.deleteProductColorByProductId(req.params);
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: deleteProductColorByProductId`
    );
  }
  res.status(response.status).send(response);
};

// updateProductColor Controller
module.exports.updateProductColor = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productColorServices.updateProductColor({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.productColorMessage.PRODUCT_COLOR_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productColorController: updateProductColor`
    );
  }
  res.status(response.status).send(response);
};
