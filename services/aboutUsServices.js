const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createAboutUs Service
module.exports.createAboutUs = async (serviceData) => {
  try {
    // check if about us is available or not
    const findQuery = `SELECT * FROM about_us`;
    const fidResponsedData = await pool.query(findQuery);
    const foundData = fidResponsedData.rows;
    if (foundData.length) {
      throw new Error(constants.aboutUsMessage.ABOUTUS_EXISTS);
    } else {
      const query = await helpers.createInsertQuery("about_us", serviceData);

      const responseData = await pool.query(query);
      const createdData = responseData.rows;
      if (createdData.length) {
        return createdData[0];
      } else {
        throw new Error(constants.aboutUsMessage.ABOUTUS_NOT_CREATED);
      }
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : abouttUsServices: createAboutUs`
    );
    throw new Error(error);
  }
};

// getAboutUs Service
module.exports.getAboutUs = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM about_us LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData[0];
  } catch (error) {
    console.log(`Something went Wrong services : abouttUsServices: getAboutUs`);
    throw new Error(error.message);
  }
};

// deleteAboutUs Service
module.exports.deleteAboutUs = async ({ id }) => {
  try {
    const query = `DELETE FROM about_us WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.aboutUsMessage.ABOUTUS_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : abouttUsServices: deleteAboutUs`
    );
    throw new Error(error.message);
  }
};

// updateAboutUs Service
module.exports.updateAboutUs = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("about_us", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.aboutUsMessage.ABOUTUS_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : abouttUsServices: updateAboutUs`
    );
    throw new Error(error);
  }
};
