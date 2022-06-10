const Joi = require("joi");

module.exports.createSlider = Joi.object({
  image: Joi.string().trim().uri(),
  title: Joi.string().trim(),
  webpage_url: Joi.string().trim(),
  position: Joi.number(),
});

module.exports.deleteSlider = Joi.object({
  id: Joi.number(),
});

module.exports.getSliderById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllSliders = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateSlider = Joi.object({
  image: Joi.string().trim(),
  title: Joi.string().trim(),
  webpage_url: Joi.string().trim(),
  position: Joi.number(),
});
