const Joi = require("joi");

module.exports.createHomepageBanner = Joi.object({
  image: Joi.string().trim().uri(),
  title: Joi.string().trim(),
  place: Joi.string().trim().required(),
  webpage_url: Joi.string().trim(),
  position: Joi.number(),
});

module.exports.deleteHomepageBanner = Joi.object({
  id: Joi.number(),
});

module.exports.getHomepageBannerById = Joi.object({
  id: Joi.number(),
});

module.exports.getAllHomepageBanners = Joi.object({
  skip: Joi.number(),
  limit: Joi.number(),
});

module.exports.updateHomepageBanner = Joi.object({
  image: Joi.string().trim(),
  title: Joi.string().trim(),
  place: Joi.string().trim(),
  webpage_url: Joi.string().trim(),
  position: Joi.number(),
});
