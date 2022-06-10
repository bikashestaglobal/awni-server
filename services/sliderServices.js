const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createSlider Service
module.exports.createSlider = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("sliders", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.sliderMessage.SLIDER_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : sliderServices: createSlider`);
    throw new Error(error);
  }
};

// getAllSliders Service
module.exports.getAllSliders = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM sliders ORDER BY position ASC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)} `;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : sliderServices: getAllSliders`
    );
    throw new Error(error.message);
  }
};

// getSliderById Service
module.exports.getSliderById = async ({ id }) => {
  try {
    const query = `SELECT * FROM sliders WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.sliderMessage.SLIDER_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getSliderById`
    );
    throw new Error(error.message);
  }
};

// deleteSlider Service
module.exports.deleteSlider = async ({ id }) => {
  try {
    const query = `DELETE FROM sliders WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.sliderMessage.SLIDER_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : sliderServices: deleteSlider`);
    throw new Error(error.message);
  }
};

// updateSlider Service
module.exports.updateSlider = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("sliders", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.sliderMessage.SLIDER_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : sliderServices: updateSlider`);
    throw new Error(error);
  }
};
