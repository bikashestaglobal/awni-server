const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createContactUs Service
module.exports.createContactUs = async (serviceData) => {
  try {
    // check if contact us is available or not
    const findQuery = `SELECT * FROM contact_us`;
    const fidResponsedData = await pool.query(findQuery);
    const foundData = fidResponsedData.rows;
    if (foundData.length) {
      throw new Error(constants.contactUsMessage.CONTACTUS_EXISTS);
    } else {
      const query = await helpers.createInsertQuery("contact_us", serviceData);

      const responseData = await pool.query(query);
      const createdData = responseData.rows;
      if (createdData.length) {
        return createdData[0];
      } else {
        throw new Error(constants.contactUsMessage.CONTACTUS_NOT_CREATED);
      }
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : contactUsServices: createContactUs`
    );
    throw new Error(error);
  }
};

// getContactUs Service
module.exports.getContactUs = async ({ skip = 0, limit = 10 }) => {
  try {
    const query = `SELECT * FROM contact_us LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData[0];
  } catch (error) {
    console.log(
      `Something went Wrong services : contactUsServices: getContactUs`
    );
    throw new Error(error.message);
  }
};

// deleteContactUs Service
module.exports.deleteContactUs = async ({ id }) => {
  try {
    const query = `DELETE FROM contact_us WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.contactUsMessage.CONTACTUS_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : contactUsServices: deleteContactUs`
    );
    throw new Error(error.message);
  }
};

// updateContactUs Service
module.exports.updateContactUs = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "contact_us",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.contactUsMessage.CONTACTUS_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : contactUsServices: updateContactUs`
    );
    throw new Error(error);
  }
};
