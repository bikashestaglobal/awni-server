const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createShape
module.exports.createShape = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "shapes",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("shapes", serviceData);
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
      throw new Error(constants.shapeMessage.SHAPE_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : shapeServices: createShape`);
    throw new Error(error);
  }
};

// getAllShapes
module.exports.getAllShapes = async ({
  skip = 0,
  limit = 10,
  query = "null",
  status = "true",
}) => {
  const conditions = "WHERE status=true";

  try {
    let searchQuery = `SELECT * FROM shapes WHERE status=true ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (status == "true") {
      searchQuery = `SELECT * FROM shapes where status=true ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "false") {
      searchQuery = `SELECT * FROM shapes where status=false ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    } else if (status == "All") {
      searchQuery = `SELECT * FROM shapes ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (query != "null") {
      searchQuery = `SELECT * FROM shapes WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(`Something went Wrong services : shapeServices: getAllShapes`);
    throw new Error(error.message);
  }
};

// getShapeById
module.exports.getShapeById = async ({ id }) => {
  try {
    const query = `SELECT * FROM shapes WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_FOUND);
    }
  } catch (error) {
    console.log(`Something went Wrong services : shapeServices: getShapeById`);
    throw new Error(error.message);
  }
};

// deleteShape
module.exports.deleteShape = async ({ id }) => {
  try {
    // const query = `DELETE FROM shapes WHERE id = ${id} RETURNING *`;
    const query = await helpers.createUpdateQuery("shapes", `id=${id}`, {
      is_deleted: true,
    });

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_DELETED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : shapeServices: deleteShape`);
    throw new Error(error.message);
  }
};

// updateShape
module.exports.updateShape = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("shapes", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.shapeMessage.SHAPE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : shapeServices: updateShape`);
    throw new Error(error);
  }
};
