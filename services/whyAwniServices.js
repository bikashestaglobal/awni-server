const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createWhyAwni Service
module.exports.createWhyAwni = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("why_awni", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.whyAwniMessage.WHY_AWNI_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : whyAwniServices: createWhyAwni`
    );
    throw new Error(error);
  }
};

// getAllWhyAwnis Service
module.exports.getAllWhyAwnis = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM why_awni LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : whyAwniServices: getAllWhyAwnis`
    );
    throw new Error(error.message);
  }
};

// getWhyAwniById Service
module.exports.getWhyAwniById = async ({ id }) => {
  try {
    const query = `SELECT * FROM why_awni WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.whyAwniMessage.WHY_AWNI_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : experience
      CentreServices: getWhyAwniById`
    );
    throw new Error(error.message);
  }
};

// deleteWhyAwni Service
module.exports.deleteWhyAwni = async ({ id }) => {
  try {
    const query = `DELETE FROM why_awni WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.whyAwniMessage.WHY_AWNI_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : whyAwniServices: deleteWhyAwni`
    );
    throw new Error(error.message);
  }
};

// updateWhyAwni Service
module.exports.updateWhyAwni = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("why_awni", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.whyAwniMessage.WHY_AWNI_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : whyAwniServices: updateWhyAwni`
    );
    throw new Error(error);
  }
};
