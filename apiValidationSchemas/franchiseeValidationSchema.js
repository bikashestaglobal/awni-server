const Joi = require("joi");

module.exports.createFranchisee = Joi.object({
  name: Joi.string().trim().required(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  email: Joi.string().trim().email(),
  address: Joi.string().trim(),
  occupation: Joi.string().trim(),
  interested_city: Joi.string().trim(),
  work_profile: Joi.string().trim(),
});

module.exports.deleteFranchisee = Joi.object({
  id: Joi.number(),
});

module.exports.getFranchiseeById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllFranchisee = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  email: Joi.string(),
  mobile: Joi.string(),
  query: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});

module.exports.generateReport = Joi.object({
  days: Joi.string(),
  startDate: Joi.string(),
  endDate: Joi.string(),
});

module.exports.updateFranchisee = Joi.object({
  name: Joi.string().trim(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  email: Joi.string().trim().email(),
  address: Joi.string().trim(),
  occupation: Joi.string().trim(),
  interested_city: Joi.string().trim(),
  work_profile: Joi.string().trim(),
});
