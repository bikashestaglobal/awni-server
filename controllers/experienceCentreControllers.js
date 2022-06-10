const constaints = require("../constants");
const experienceCretreServices = require("../services/experienceCretreServices");

// createExperienceCentre Controller
module.exports.createExperienceCentre = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await experienceCretreServices.createExperienceCentre(req.body);
    response.status = 200;
    response.message = constaints.experienceCentreMessage.EXP_CENTRE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : experienceCentreController: createExperienceCentre`
    );
  }
  res.status(response.status).send(response);
};

// getAllExperienceCentres Controller
module.exports.getAllExperienceCentres = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await experienceCretreServices.getAllExperienceCentres(req.query);
    response.status = 200;
    response.message = constaints.experienceCentreMessage.EXP_CENTRE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : experienceCentreController: getAllExperienceCentres`
    );
  }
  res.status(response.status).send(response);
};

// getExperienceCentreById Controller
module.exports.getExperienceCentreById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await experienceCretreServices.getExperienceCentreById(req.params);
    response.status = 200;
    response.message = constaints.experienceCentreMessage.EXP_CENTRE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : experienceCentreController: getExperienceCentreById`
    );
  }
  res.status(response.status).send(response);
};

// deleteExperienceCentre Controller
module.exports.deleteExperienceCentre = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await experienceCretreServices.deleteExperienceCentre(req.params);
    response.status = 200;
    response.message = constaints.experienceCentreMessage.EXP_CENTRE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : experienceCentreController: deleteExperienceCentre`
    );
  }
  res.status(response.status).send(response);
};

// updateExperienceCentre Controller
module.exports.updateExperienceCentre = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService =
      await experienceCretreServices.updateExperienceCentre({
        id: req.params.id,
        body: req.body,
      });
    response.status = 200;
    response.message = constaints.experienceCentreMessage.EXP_CENTRE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : experienceCentreController: updateExperienceCentre`
    );
  }
  res.status(response.status).send(response);
};
