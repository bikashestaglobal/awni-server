const constaints = require("../constants");
const sliderServices = require("../services/sliderServices");

// createSlider Controller
module.exports.createSlider = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await sliderServices.createSlider(req.body);
    response.status = 200;
    response.message = constaints.sliderMessage.SLIDER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : sliderController: createSlider`
    );
  }
  res.status(response.status).send(response);
};

// getAllSliders Controller
module.exports.getAllSliders = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await sliderServices.getAllSliders(req.query);
    response.status = 200;
    response.message = constaints.sliderMessage.SLIDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : sliderController: getAllSliders`
    );
  }
  res.status(response.status).send(response);
};

// getSliderById Controller
module.exports.getSliderById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await sliderServices.getSliderById(req.params);
    response.status = 200;
    response.message = constaints.sliderMessage.SLIDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : sliderController: getSliderById`
    );
  }
  res.status(response.status).send(response);
};

// deleteSlider Controller
module.exports.deleteSlider = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await sliderServices.deleteSlider(req.params);
    response.status = 200;
    response.message = constaints.sliderMessage.SLIDER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : sliderController: deleteSlider`
    );
  }
  res.status(response.status).send(response);
};

// updateSlider Controller
module.exports.updateSlider = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await sliderServices.updateSlider({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.sliderMessage.SLIDER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : sliderController: updateSlider`
    );
  }
  res.status(response.status).send(response);
};
