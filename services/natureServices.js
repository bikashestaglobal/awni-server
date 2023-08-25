const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createNature
module.exports.createNature = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "natures",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("natures", serviceData);
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
      throw new Error(constants.natureMessage.NATURE_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : natureServices: createNature`);
    throw new Error(error);
  }
};

// getAllNatures
module.exports.getAllNatures = async ({
  skip = 0,
  limit = 10,
  query = "null",
  status = "true",
}) => {
  const conditions = "WHERE status=true";

  try {
    let searchQuery = `SELECT * FROM natures WHERE status=true ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (status == "true") {
      searchQuery = `SELECT * FROM natures where status=true ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "false") {
      searchQuery = `SELECT * FROM natures where status=false ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "All") {
      searchQuery = `SELECT * FROM natures ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (query != "null") {
      searchQuery = `SELECT * FROM natures WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : natureServices: getAllNatures`
    );
    throw new Error(error.message);
  }
};

// getNatureById
module.exports.getNatureById = async ({ id }) => {
  try {
    const query = `SELECT * FROM natures WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.natureMessage.NATURE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : natureServices: getNatureById`
    );
    throw new Error(error.message);
  }
};

// deleteNature
module.exports.deleteNature = async ({ id }) => {
  try {
    // const query = `DELETE FROM natures WHERE id = ${id} RETURNING *`;
    const query = await helpers.createUpdateQuery("natures", `id=${id}`, {
      is_deleted: true,
    });

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.natureMessage.NATURE_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : natureServices: deleteNature`);
    throw new Error(error.message);
  }
};

// updateNature
module.exports.updateNature = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("natures", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.natureMessage.NATURE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : natureServices: updateNature`);
    throw new Error(error);
  }
};
