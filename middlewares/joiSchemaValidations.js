const constants = require("../constants");

// validateBody
module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const response = { ...constants.defaultServerResponse };
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const modifyError = {};
      error.details.map((value) => {
        modifyError[value.path.join(".")] = value.message;
      });

      // console.log(modifyError);
      response.message = constants.validationMessage.VALIDATION_FAILED;
      response.errors = modifyError;
      res.status(response.status).send(response);
    } else {
      return next();
    }
  };
};

// validateQuery
module.exports.validateQuery = (schema) => {
  return (req, res, next) => {
    const response = { ...constants.defaultServerResponse };
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      const modifyError = {};
      error.details.map((value) => {
        modifyError[value.path.join(".")] = value.message;
      });

      // console.log(modifyError);
      response.message = constants.validationMessage.VALIDATION_FAILED;
      response.errors = modifyError;
      res.status(response.status).send(response);
    } else {
      return next();
    }
  };
};

// validateParams
module.exports.validateParams = (schema) => {
  return (req, res, next) => {
    const response = { ...constants.defaultServerResponse };
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const modifyError = {};
      error.details.map((value) => {
        modifyError[value.path.join(".")] = value.message;
      });

      // console.log(modifyError);
      response.message = constants.validationMessage.VALIDATION_FAILED;
      response.errors = modifyError;
      res.status(response.status).send(response);
    } else {
      return next();
    }
  };
};
