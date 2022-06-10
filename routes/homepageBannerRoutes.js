const express = require("express");
const homepageBanner = express.Router();
const homepageBannerControllers = require("../controllers/homepageBannerControllers");
const homepageBannerSchema = require("../apiValidationSchemas/homepageBannerSchema");
const joiSchemaValidations = require("../middlewares/joiSchemaValidations");

// createHomepageBanner Routes
homepageBanner.post(
  "/",
  joiSchemaValidations.validateBody(homepageBannerSchema.createHomepageBanner),
  homepageBannerControllers.createHomepageBanner
);

// getAllHomepageBanners Routes
homepageBanner.get(
  "/",
  joiSchemaValidations.validateQuery(
    homepageBannerSchema.getAllHomepageBanners
  ),
  homepageBannerControllers.getAllHomepageBanners
);

// getHomepageBannerById Routes
homepageBanner.get(
  "/:id",
  joiSchemaValidations.validateParams(
    homepageBannerSchema.getHomepageBannerById
  ),
  homepageBannerControllers.getHomepageBannerById
);

// deleteHomepageBanner Routes
homepageBanner.delete(
  "/:id",
  joiSchemaValidations.validateParams(
    homepageBannerSchema.deleteHomepageBanner
  ),
  homepageBannerControllers.deleteHomepageBanner
);

// updateHomepageBanner Routes
homepageBanner.put(
  "/:id",
  joiSchemaValidations.validateBody(homepageBannerSchema.updateHomepageBanner),
  homepageBannerControllers.updateHomepageBanner
);

module.exports = homepageBanner;
