const Joi = require("joi");

module.exports.createEnquiry = Joi.object({
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
  city: Joi.string().trim(),
  message: Joi.string().trim(),
  product_slug: Joi.string().trim(),
});

module.exports.deleteEnquiry = Joi.object({
  id: Joi.number(),
});

module.exports.getEnquiryById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllEnquiries = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  status: Joi.string(),
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

module.exports.updateEnquiry = Joi.object({
  name: Joi.string().trim(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  email: Joi.string().trim().email(),
  city: Joi.string().trim(),
  message: Joi.string().trim(),
  product_slug: Joi.string().trim(),
  status: Joi.string().trim(),
});
