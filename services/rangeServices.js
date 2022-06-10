const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createRange Service
module.exports.createRange = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("ranges", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.rangeMessage.RANGE_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : rangeServices: createRange`);
    throw new Error(error);
  }
};

// getAllRanges Service
module.exports.getAllRanges = async ({
  skip = 0,
  limit = 10,
  query = "null",
}) => {
  try {
    let searchQuery = `SELECT * FROM ranges ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (query != "null") {
      searchQuery = `SELECT * FROM ranges WHERE name ILIKE '%${query}%' ORDER BY created_at DESC `;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(`Something went Wrong services : rangeServices: getAllRanges`);
    throw new Error(error.message);
  }
};

// getRangeById Service
module.exports.getRangeById = async ({ id }) => {
  try {
    const query = `SELECT * FROM ranges WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.rangeMessage.RANGE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getRangeById`
    );
    throw new Error(error.message);
  }
};

// deleteRange Service
module.exports.deleteRange = async ({ id }) => {
  try {
    const query = `DELETE FROM ranges WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.rangeMessage.RANGE_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : rangeServices: deleteRange`);
    throw new Error(error.message);
  }
};

// updateRange Service
module.exports.updateRange = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("ranges", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.rangeMessage.RANGE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : rangeServices: updateRange`);
    throw new Error(error);
  }
};
