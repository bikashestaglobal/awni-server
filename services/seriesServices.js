const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createSeries
module.exports.createSeries = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "series",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("series", serviceData);
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
      throw new Error(constants.seriesMessage.SERIES_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : seriesServices: createSeries`);
    throw new Error(error);
  }
};

// getAllSeries
module.exports.getAllSeries = async ({
  skip = 0,
  limit = 10,
  query = "null",
  status = "true",
}) => {
  const conditions = "WHERE status=true";

  try {
    let searchQuery = `SELECT * FROM series WHERE status=true ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (status == "true") {
      searchQuery = `SELECT * FROM series where status=true ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "false") {
      searchQuery = `SELECT * FROM series where status=false ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "All") {
      searchQuery = `SELECT * FROM series ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (query != "null") {
      searchQuery = `SELECT * FROM series WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(`Something went Wrong services : seriesServices: getAllSeries`);
    throw new Error(error.message);
  }
};

// getSeriesById
module.exports.getSeriesById = async ({ id }) => {
  try {
    const query = `SELECT * FROM series WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.seriesMessage.SERIES_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : seriesServices: getSeriesById`
    );
    throw new Error(error.message);
  }
};

// deleteSeries
module.exports.deleteSeries = async ({ id }) => {
  try {
    // const query = `DELETE FROM series WHERE id = ${id} RETURNING *`;
    const query = await helpers.createUpdateQuery("series", `id=${id}`, {
      is_deleted: true,
    });

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.seriesMessage.SERIES_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : seriesServices: deleteSeries`);
    throw new Error(error.message);
  }
};

// updateSeries
module.exports.updateSeries = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("series", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.seriesMessage.SERIES_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : seriesServices: updateSeries`);
    throw new Error(error);
  }
};
