const constaints = require("../constants");
const parCategoryServices = require("../services/parCategoryServices");

// createCategory Controller
module.exports.createCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.createCategory(
      req.body
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : categoryController: createCategory`
    );
  }
  res.status(response.status).send(response);
};

// getAllCategories Controller
module.exports.getAllCategories = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.getAllCategories(
      req.query
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : categoryController: getAllCategories`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
module.exports.getAllProducts = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.getAllProducts(
      req.query
    );
    response.status = 200;
    response.message = constaints.categoryMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : parCategoryController: getAllProducts`
    );
  }
  res.status(response.status).send(response);
};

// getSubCategories Controller
module.exports.getSubCategories = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.getSubCategories(
      req.query
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : parCategoryController: getSubCategories`
    );
  }
  res.status(response.status).send(response);
};

// getChildCategories Controller
module.exports.getChildCategories = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.getChildCategories(
      req.query
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : parCategoryController: getChildCategories`
    );
  }
  res.status(response.status).send(response);
};

// getCategoryById Controller
module.exports.getCategoryById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.getCategoryById(
      req.params
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : categoryController: getCategoryById`
    );
  }
  res.status(response.status).send(response);
};

// deleteCategory Controller
module.exports.deleteCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.deleteCategory(
      req.params
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : categoryController: deleteCategory`
    );
  }
  res.status(response.status).send(response);
};

// updateCategory Controller
module.exports.updateCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await parCategoryServices.updateCategory({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : categoryController: updateCategory`
    );
  }
  res.status(response.status).send(response);
};
