const constaints = require("../constants");
const seriesServices = require("../services/seriesServices");

// createSeries
module.exports.createSeries = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await seriesServices.createSeries(req.body);
    response.status = 200;
    response.message = constaints.seriesMessage.SERIES_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : seriesController: createSeries`
    );
  }
  res.status(response.status).send(response);
};

// getAllSeries
module.exports.getAllSeries = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await seriesServices.getAllSeries(req.query);
    response.status = 200;
    response.message = constaints.seriesMessage.SERIES_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : seriesController: getAllSeries`
    );
  }
  res.status(response.status).send(response);
};

// getAllProducts Controller
// module.exports.getAllProducts = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await seriesServices.getAllProducts(req.query);
//     response.status = 200;
//     response.message = constaints.seriesMessage.PRODUCT_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : parseriesController: getAllProducts`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getSeriesById
module.exports.getSeriesById = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await seriesServices.getSeriesById(req.params);
    response.status = 200;
    response.message = constaints.seriesMessage.SERIES_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : seriesController: getSeriesById`
    );
  }
  res.status(response.status).send(response);
};

// deleteSeries
module.exports.deleteSeries = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await seriesServices.deleteSeries(req.params);
    response.status = 200;
    response.message = constaints.seriesMessage.SERIES_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : seriesController: deleteSeries`
    );
  }
  res.status(response.status).send(response);
};

// updateSeries
module.exports.updateSeries = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await seriesServices.updateSeries({
      id: req.params.id,
      body: req.body,
    });
    response.status = 200;
    response.message = constaints.seriesMessage.SERIES_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : seriesController: updateSeries`
    );
  }
  res.status(response.status).send(response);
};
