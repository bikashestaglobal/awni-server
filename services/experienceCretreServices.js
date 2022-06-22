const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createExperienceCentre Service
module.exports.createExperienceCentre = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery(
      "experience_centres",
      serviceData
    );

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.experienceCentreMessage.EXP_CENTRE_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experienceCentreServices: createExperienceCentre`
    );
    throw new Error(error);
  }
};

// getAllExperienceCentres Service
module.exports.getAllExperienceCentres = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM experience_centres LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : experienceCentreServices: getAllExperienceCentres`
    );
    throw new Error(error.message);
  }
};

// getExperienceCentreById Service
module.exports.getExperienceCentreById = async ({ id }) => {
  try {
    const query = `SELECT * FROM experience_centres WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.experienceCentreMessage.EXP_CENTRE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getExperienceCentreById`
    );
    throw new Error(error.message);
  }
};

// deleteExperienceCentre Service
module.exports.deleteExperienceCentre = async ({ id }) => {
  try {
    const query = `DELETE FROM experience_centres WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.experienceCentreMessage.EXP_CENTRE_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experienceCentreServices: deleteExperienceCentre`
    );
    throw new Error(error.message);
  }
};

// updateExperienceCentre Service
module.exports.updateExperienceCentre = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "experience_centres",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.experienceCentreMessage.EXP_CENTRE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experienceCentreServices: updateExperienceCentre`
    );
    throw new Error(error);
  }
};
