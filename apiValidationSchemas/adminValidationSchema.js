const Joi = require("joi");

module.exports.createAdmin = Joi.object({
  name: Joi.string().trim().required().min(2),
  mobile: Joi.string().trim().required().min(10).max(10),
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

module.exports.adminLogin = Joi.object({
  email: Joi.string().trim().email(),
  password: Joi.string().required(),
});

module.exports.updateAdmin = Joi.object({
  name: Joi.string().trim().min(2),
  mobile: Joi.string().trim().min(10).max(10),
  email: Joi.string().trim().email(),
  password: Joi.string(),
});

module.exports.findAccount = Joi.object({
  email: Joi.string().trim().email().required(),
});

module.exports.createPassword = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});
