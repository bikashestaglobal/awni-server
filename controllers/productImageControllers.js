const constaints = require("../constants");
const productImageServices = require("../services/productImageServices");

// createProductImage Controller
module.exports.createProductImage = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productImageServices.createProductImage(
      req.body
    );
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: createProductImage`
    );
  }
  res.status(response.status).send(response);
};

// getAllProductImages Controller
module.exports.getAllProductImages = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productImageServices.getAllProductImages(
      req.query
    );
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: getAllProductImages`
    );
  }
  res.status(response.status).send(response);
};

// getProductImageById Controller
module.exports.getProductImageById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productImageServices.getProductImageById(
      req.params
    );
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: getProductImageById`
    );
  }
  res.status(response.status).send(response);
};

// deleteProductImage Controller
module.exports.deleteProductImage = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productImageServices.deleteProductImage(
      req.params
    );
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: deleteProductImage`
    );
  }
  res.status(response.status).send(response);
};

// deleteProductImageByProductId Controller
module.exports.deleteProductImageByProductId = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await productImageServices.deleteProductImageByProductId(req.params);
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: deleteProductImageByProductId`
    );
  }
  res.status(response.status).send(response);
};

// updateProductImage Controller
module.exports.updateProductImage = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await productImageServices.updateProductImage({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.productImageMessage.PRODUCT_IMG_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : productImageController: updateProductImage`
    );
  }
  res.status(response.status).send(response);
};
