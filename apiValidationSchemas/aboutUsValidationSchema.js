const Joi = require("joi");

module.exports.createAboutUs = Joi.object({
  about_title: Joi.string().required(),
  about_description: Joi.string(),
  about_bg_image: Joi.string(),
  about_fe_image: Joi.string(),
  about_image_title: Joi.string(),

  mission_title: Joi.string(),
  mission_description: Joi.string(),
  vision_title: Joi.string(),
  vision_description: Joi.string(),
  mission_bg_image: Joi.string(),
  mission_fe_image: Joi.string(),

  why_title: Joi.string(),
  why_description: Joi.string(),
});

module.exports.deleteAboutUs = Joi.object({
  id: Joi.number(),
});

module.exports.updateAboutUs = Joi.object({
  about_title: Joi.string().required(),
  about_description: Joi.string(),
  about_bg_image: Joi.string(),
  about_fe_image: Joi.string(),
  about_image_title: Joi.string(),

  mission_title: Joi.string(),
  mission_description: Joi.string(),
  vision_title: Joi.string(),
  vision_description: Joi.string(),
  mission_bg_image: Joi.string(),
  mission_fe_image: Joi.string(),

  why_title: Joi.string(),
  why_description: Joi.string(),
});
