const constaints = require("../constants");
const homepageBannersServices = require("../services/homepageBannersServices");

// createHomepageBanner Controller
module.exports.createHomepageBanner = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await homepageBannersServices.createHomepageBanner(req.body);
    response.status = 200;
    response.message = constaints.homepageBannerMessage.HOMEPAGE_BANNER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : homepageBannerController: createHomepageBanner`
    );
  }
  res.status(response.status).send(response);
};

// getAllHomepageBanners Controller
module.exports.getAllHomepageBanners = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await homepageBannersServices.getAllHomepageBanners(req.query);
    response.status = 200;
    response.message = constaints.homepageBannerMessage.HOMEPAGE_BANNER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : homepageBannerController: getAllHomepageBanners`
    );
  }
  res.status(response.status).send(response);
};

// getHomepageBannerById Controller
module.exports.getHomepageBannerById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await homepageBannersServices.getHomepageBannerById(req.params);
    response.status = 200;
    response.message = constaints.homepageBannerMessage.HOMEPAGE_BANNER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : homepageBannerController: getHomepageBannerById`
    );
  }
  res.status(response.status).send(response);
};

// deleteHomepageBanner Controller
module.exports.deleteHomepageBanner = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await homepageBannersServices.deleteHomepageBanner(req.params);
    response.status = 200;
    response.message = constaints.homepageBannerMessage.HOMEPAGE_BANNER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : homepageBannerController: deleteHomepageBanner`
    );
  }
  res.status(response.status).send(response);
};

// updateHomepageBanner Controller
module.exports.updateHomepageBanner = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await homepageBannersServices.updateHomepageBanner({
        id: req.params.id,
        body: req.body,
      });
    response.status = 200;
    response.message = constaints.homepageBannerMessage.HOMEPAGE_BANNER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : homepageBannerController: updateHomepageBanner`
    );
  }
  res.status(response.status).send(response);
};
