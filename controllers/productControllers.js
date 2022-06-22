const constaints = require("../constants");
const productServices = require("../services/productServices");

// createProduct Controller
module.exports.createProduct = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.createProduct(req.body);
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: createProduct`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
module.exports.getAllProducts = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.getAllProducts(req.query);
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: getAllProducts`,
      error
    );
  }
  res.status(response.status).send(response);
};

// getProductById Controller
module.exports.getProductById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.getProductById(
      req.params
    );
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: getProductById`
    );
  }
  res.status(response.status).send(response);
};

// getProductBySlug Controller
module.exports.getProductBySlug = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.getProductBySlug(
      req.params
    );
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: getProductBySlug`
    );
  }
  res.status(response.status).send(response);
};

// getProductWithColorImages Controller
module.exports.getProductWithColorImages = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.getProductWithColorImages(
      req.params
    );
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: getProductWithColorImages`
    );
  }
  res.status(response.status).send(response);
};

// deleteProduct Controller
module.exports.deleteProduct = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.deleteProduct(req.params);
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: deleteProduct`
    );
  }
  res.status(response.status).send(response);
};

// updateProduct Controller
module.exports.updateProduct = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productServices.updateProduct({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.productMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productController: updateProduct`
    );
  }
  res.status(response.status).send(response);
};
