const constaints = require("../constants");
const childCategoryServices = require("../services/childCategoryServices");

// createCategory Controller
module.exports.createCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await childCategoryServices.createCategory(
      req.body
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : childCategoryController: createCategory`
    );
  }
  res.status(response.status).send(response);
};

// getAllCategories Controller
module.exports.getAllCategories = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await childCategoryServices.getAllCategories(
      req.query
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : childCategoryController: getAllCategories`
    );
  }
  res.status(response.status).send(response);
};

// getCategoryById Controller
module.exports.getCategoryById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await childCategoryServices.getCategoryById(
      req.params
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : childCategoryController: getCategoryById`
    );
  }
  res.status(response.status).send(response);
};

// deleteCategory Controller
module.exports.deleteCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await childCategoryServices.deleteCategory(
      req.params
    );
    response.status = 200;
    response.message = constaints.categoryMessage.CATEGORY_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : childCategoryController: deleteCategory`
    );
  }
  res.status(response.status).send(response);
};

// updateCategory Controller
module.exports.updateCategory = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await childCategoryServices.updateCategory({
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
      `Something went Wrong controller : childCategoryController: updateCategory`
    );
  }
  res.status(response.status).send(response);
};
