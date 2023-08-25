const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createSurface
module.exports.createSurface = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "surfaces",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("surfaces", serviceData);
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
      throw new Error(constants.surfaceMessage.SURFACE_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : surfaceServices: createSurface`
    );
    throw new Error(error);
  }
};

// getAllSurfaces
module.exports.getAllSurfaces = async ({
  skip = 0,
  limit = 10,
  query = "null",
  status = "true",
}) => {
  const conditions = "WHERE status=true";

  try {
    let searchQuery = `SELECT * FROM surfaces WHERE status=true ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (status == "true") {
      searchQuery = `SELECT * FROM surfaces where status=true ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "false") {
      searchQuery = `SELECT * FROM surfaces where status=false ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "All") {
      searchQuery = `SELECT * FROM surfaces ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (query != "null") {
      searchQuery = `SELECT * FROM surfaces WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : surfaceServices: getAllSurfaces`
    );
    throw new Error(error.message);
  }
};

// getSurfaceById
module.exports.getSurfaceById = async ({ id }) => {
  try {
    const query = `SELECT * FROM surfaces WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.surfaceMessage.SURFACE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : surfaceServices: getSurfaceById`
    );
    throw new Error(error.message);
  }
};

// deleteSurface
module.exports.deleteSurface = async ({ id }) => {
  try {
    // const query = `DELETE FROM surfaces WHERE id = ${id} RETURNING *`;
    const query = await helpers.createUpdateQuery("surfaces", `id=${id}`, {
      is_deleted: true,
    });

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.surfaceMessage.SURFACE_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : surfaceServices: deleteSurface`
    );
    throw new Error(error.message);
  }
};

// updateSurface
module.exports.updateSurface = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("surfaces", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.surfaceMessage.SURFACE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : surfaceServices: updateSurface`
    );
    throw new Error(error);
  }
};
