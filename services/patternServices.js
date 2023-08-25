const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createPattern
module.exports.createPattern = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "patterns",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("patterns", serviceData);
    }
    // let query = `INSERT INTO par_categories(${Object.keys(
    //   serviceData
    // )}) VALUES(${Object.values(serviceData).map(
    //   (item) => `'${item}'`
    // )}) RETURNING *`;

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.patternMessage.PATTERN_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : patternServices: createPattern`
    );
    throw new Error(error);
  }
};

// getAllPatterns
module.exports.getAllPatterns = async ({
  skip = 0,
  limit = 10,
  query = "null",
  status = "true",
}) => {
  const conditions = "WHERE status=true";

  try {
    let searchQuery = `SELECT * FROM patterns WHERE status=true ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (status == "true") {
      searchQuery = `SELECT * FROM patterns where status=true ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "false") {
      searchQuery = `SELECT * FROM patterns where status=false ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "All") {
      searchQuery = `SELECT * FROM patterns ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (query != "null") {
      searchQuery = `SELECT * FROM patterns WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : patternServices: getAllPatterns`
    );
    throw new Error(error.message);
  }
};

// getPatternById
module.exports.getPatternById = async ({ id }) => {
  try {
    const query = `SELECT * FROM patterns WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.patternMessage.PATTERN_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : patternServices: getPatternById`
    );
    throw new Error(error.message);
  }
};

// deletePattern
module.exports.deletePattern = async ({ id }) => {
  try {
    // const query = `DELETE FROM patterns WHERE id = ${id} RETURNING *`;
    const query = await helpers.createUpdateQuery("patterns", `id=${id}`, {
      is_deleted: true,
    });

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.patternMessage.PATTERN_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : patternServices: deletePattern`
    );
    throw new Error(error.message);
  }
};

// updatePattern
module.exports.updatePattern = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("patterns", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.patternMessage.PATTERN_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : patternServices: updatePattern`
    );
    throw new Error(error);
  }
};
