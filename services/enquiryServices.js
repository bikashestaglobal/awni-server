const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createEnquiry Service
module.exports.createEnquiry = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("enquiries", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.enquiryMessage.ENQUIRY_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: createEnquiry`
    );
    throw new Error(error);
  }
};

// getAllEnquiries Service
module.exports.getAllEnquiries = async ({
  skip = 0,
  limit = 10,
  status,
  email,
  mobile,
  query: searchQuery = "null",
  start_date = "null",
  end_date = "null",
}) => {
  try {
    let whereCondition = `WHERE status='${
      status != undefined && status != "undefined" ? status : "PENDING"
    }'`;
    let orderBy = "ORDER BY created_at DESC";
    let query = ``;

    if (status != undefined && status != "undefined") {
      whereCondition = `${whereCondition} AND status = '${status}'`;
    }

    if (mobile != undefined && mobile != "undefined") {
      whereCondition = `${whereCondition} AND mobile = '${mobile}'`;
    }

    if (start_date != "null" && end_date == "null") {
      whereCondition = `${whereCondition} AND CAST(created_at AS DATE)='${start_date}'`;
    }

    if (start_date != "null" && end_date != "null") {
      whereCondition = `${whereCondition} AND created_at BETWEEN '${start_date}' AND '${end_date}'`;
    }

    query = `SELECT * FROM enquiries ${whereCondition} ${orderBy} LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (searchQuery != "null") {
      query = `SELECT * FROM enquiries WHERE name ILIKE '%${searchQuery}%' OR mobile ILIKE '%${searchQuery}%' OR email ILIKE '%${searchQuery}%' OR city ILIKE '%${searchQuery}%' OR message ILIKE '%${searchQuery}%' ORDER BY created_at DESC`;
    }

    // console.log(query);

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: getAllEnquiries`
    );
    throw new Error(error.message);
  }
};

// generateReport Service
module.exports.generateReport = async ({ days = "30 day" }) => {
  try {
    let query = `SELECT COUNT(*) as count,
        date_trunc('day', created_at) as day
    FROM enquiries
    WHERE created_at >= date_trunc('day', NOW()) - INTERVAL '${days}'
    GROUP BY date_trunc('day', created_at)`;

    // console.log(query);

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: getAllEnquiries`
    );
    throw new Error(error.message);
  }
};

// getEnquiryById Service
module.exports.getEnquiryById = async ({ id }) => {
  try {
    const query = `SELECT * FROM enquiries WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.enquiryMessage.ENQUIRY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: getEnquiryById`
    );
    throw new Error(error.message);
  }
};

// deleteEnquiry Service
module.exports.deleteEnquiry = async ({ id }) => {
  try {
    const query = `DELETE FROM enquiries WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.enquiryMessage.ENQUIRY_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: deleteEnquiry`
    );
    throw new Error(error.message);
  }
};

// updateEnquiry Service
module.exports.updateEnquiry = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "enquiries",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.enquiryMessage.ENQUIRY_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : enquiryServices: updateEnquiry`
    );
    throw new Error(error);
  }
};
