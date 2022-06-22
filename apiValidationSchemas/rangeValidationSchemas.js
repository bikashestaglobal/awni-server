const Joi = require("joi");

module.exports.createRange = Joi.object({
  name: [Joi.string().trim(), Joi.array()],
});

module.exports.deleteRange = Joi.object({
  id: Joi.number(),
});

module.exports.getRangeById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllRanges = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
  query: Joi.string(),
});

module.exports.updateRange = Joi.object({
  name: Joi.string(),
});
