const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createHomepageBanner Service
module.exports.createHomepageBanner = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery(
      "homepage_banners",
      serviceData
    );

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(
        constants.homepageBannerMessage.HOMEPAGE_BANNER_NOT_CREATED
      );
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : homepageBannerServices: createHomepageBanner`
    );
    throw new Error(error);
  }
};

// getAllHomepageBanners Service
module.exports.getAllHomepageBanners = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM homepage_banners ORDER BY position ASC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : homepageBannerServices: getAllHomepageBanners`
    );
    throw new Error(error.message);
  }
};

// getHomepageBannerById Service
module.exports.getHomepageBannerById = async ({ id }) => {
  try {
    const query = `SELECT * FROM homepage_banners WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(
        constants.homepageBannerMessage.HOMEPAGE_BANNER_NOT_FOUND
      );
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getHomepageBannerById`
    );
    throw new Error(error.message);
  }
};

// deleteHomepageBanner Service
module.exports.deleteHomepageBanner = async ({ id }) => {
  try {
    const query = `DELETE FROM homepage_banners WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(
        constants.homepageBannerMessage.HOMEPAGE_BANNER_NOT_DELETED
      );
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : homepageBannerServices: deleteHomepageBanner`
    );
    throw new Error(error.message);
  }
};

// updateHomepageBanner Service
module.exports.updateHomepageBanner = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "homepage_banners",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(
        constants.homepageBannerMessage.HOMEPAGE_BANNER_NOT_UPDATED
      );
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : homepageBannerServices: updateHomepageBanner`
    );
    throw new Error(error);
  }
};
