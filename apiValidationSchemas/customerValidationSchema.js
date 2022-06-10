const Joi = require("joi");

// Customer Registration schema
module.exports.register = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().required(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  password: Joi.string().min(6).trim().required(),
});

// socialRegistration schema
module.exports.socialRegistration = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().required(),
});

// Customer Login schema
module.exports.login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).trim().required(),
});

// getAllCustomer schema
module.exports.getAllCustomers = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  query: Joi.string(),
  is_verified: Joi.string(),
  status: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string(),
});

// findAccount schema
module.exports.findAccount = Joi.object({
  email: Joi.string().email().required(),
});

// resendOTP schema
module.exports.resendOTP = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  otp: Joi.number().required(),
});

// createNewPassword schema
module.exports.createNewPassword = Joi.object({
  password: Joi.string().required().min(6),
});

// Add Address schema
module.exports.addAddress = Joi.object({
  name: Joi.string().trim().min(3).required(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  email: Joi.string().email().trim().required(),
  alternateMobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
      "any.required": `"Mobile" is a required field`,
    }),
  city: Joi.string().trim().required(),
  address: Joi.string().min(6).trim().required(),
  pincode: Joi.number().min(6).required(),
  companyName: Joi.string(),
});

// Customer updateProfile schema
module.exports.updateProfile = Joi.object({
  name: Joi.string().trim(),
  mobile: Joi.string().trim().min(10),
  email: Joi.string().trim().email(),
  password: Joi.string().min(6).trim(),
  address_1: Joi.string().trim(),
  address_2: Joi.string().trim(),
  pincode: Joi.number(),
  city: Joi.string().trim(),
  state: Joi.string().trim(),
  country: Joi.string().trim(),
});

// updateCustomer schema
module.exports.updateCustomer = Joi.object({
  is_verified: Joi.boolean(),
  status: Joi.boolean(),
});
