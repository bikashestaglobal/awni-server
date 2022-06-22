const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createColor Service
module.exports.createColor = async (serviceData) => {
  try {
    let query = "";

    if (Array.isArray(serviceData.name)) {
      query = await helpers.createMultyInsertQuery("colors", serviceData.name);
    } else {
      query = await helpers.createInsertQuery("colors", serviceData);
    }

    const responseData = await pool.query(query);
    const createdData = responseData.rows;

    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : colorServices: createColor`);
    throw new Error(error);
  }
};

// getAllColors Service
module.exports.getAllColors = async ({
  skip = 0,
  limit = 10,
  query = "null",
}) => {
  try {
    let searchQuery = `SELECT * FROM colors ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (query != "null") {
      searchQuery = `SELECT * FROM colors WHERE name ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(`Something went Wrong services : colorServices: getAllColors`);
    throw new Error(error.message);
  }
};

// getColorById Service
module.exports.getColorById = async ({ id }) => {
  try {
    const query = `SELECT * FROM colors WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getColorById`
    );
    throw new Error(error.message);
  }
};

// deleteColor Service
module.exports.deleteColor = async ({ id }) => {
  try {
    const query = `DELETE FROM colors WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : colorServices: deleteColor`);
    throw new Error(error.message);
  }
};

// updateColor Service
module.exports.updateColor = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("colors", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.colorMessage.COLOR_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : colorServices: updateColor`);
    throw new Error(error);
  }
};
