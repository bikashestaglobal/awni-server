const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createFranchisee Service
module.exports.createFranchisee = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("franchisee", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.franchiseeMessage.FRANCHISEE_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: createFranchisee`
    );
    throw new Error(error);
  }
};

// getAllFranchisee Service
module.exports.getAllFranchisee = async ({
  skip = 0,
  limit = 10,
  email,
  mobile,
  query: searchQuery = "null",
  start_date = "null",
  end_date = "null",
}) => {
  try {
    let whereCondition = `WHERE 1=1`;
    let orderBy = "ORDER BY created_at DESC";
    let query = ``;

    if (mobile != undefined && mobile != "undefined") {
      whereCondition = `${whereCondition} AND mobile = '${mobile}'`;
    }

    if (start_date != "null" && end_date == "null") {
      whereCondition = `${whereCondition} AND CAST(created_at AS DATE)='${start_date}'`;
    }

    if (start_date != "null" && end_date != "null") {
      whereCondition = `${whereCondition} AND created_at BETWEEN '${start_date}' AND '${end_date}'`;
    }

    query = `SELECT * FROM franchisee ${whereCondition} ${orderBy} LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (searchQuery != "null") {
      query = `SELECT * FROM franchisee WHERE name ILIKE '%${searchQuery}%' OR mobile ILIKE '%${searchQuery}%' OR email ILIKE '%${searchQuery}%' OR address ILIKE '%${searchQuery}%' OR occupation ILIKE '%${searchQuery}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: getAllFranchisee`
    );
    throw new Error(error.message);
  }
};

// generateReport Service
module.exports.generateReport = async ({
  days = "30",
  startDate = "null",
  endDate = "null",
}) => {
  try {
    let query = `SELECT COUNT(*) as count,
        date_trunc('day', created_at) as day
    FROM franchisee
    WHERE created_at >= date_trunc('day', NOW()) - INTERVAL '${
      days == "null" ? 30 : days
    } day'
    GROUP BY date_trunc('day', created_at)`;

    //     let query = `SELECT COUNT(*) as count,
    //     date_trunc('month', created_at) as day
    // FROM enquiries
    // GROUP BY date_trunc('month', created_at)`;

    //     let query = `SELECT COUNT(*) as count, DATE_TRUNC('month',created_at) AS day
    // FROM enquiries
    // WHERE created_at BETWEEN '2022-01-01' AND '2022-6-14 23:59:59' GROUP BY DATE_TRUNC('month', created_at)`;

    if (days != "null") {
      query = `SELECT COUNT(*) as count,
        date_trunc('day', created_at) as day
    FROM franchisee
    WHERE created_at >= date_trunc('day', NOW()) - INTERVAL '${days} day'
    GROUP BY date_trunc('day', created_at)`;
    }

    if (startDate != "null" && endDate != "null") {
      query = `SELECT COUNT(*) as count, DATE_TRUNC('month',created_at) AS day
FROM franchisee
WHERE created_at BETWEEN '${startDate}' AND '${endDate} 23:59:59' GROUP BY DATE_TRUNC('month', created_at)`;
    }

    const responseData = await pool.query(query);

    const fetchedData = responseData.rows;

    fetchedData.sort(function (a, b) {
      var c = new Date(a.day);
      var d = new Date(b.day);
      return c - d;
    });

    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: getAllFranchisee`
    );
    throw new Error(error.message);
  }
};

// getFranchiseeById Service
module.exports.getFranchiseeById = async ({ id }) => {
  try {
    const query = `SELECT * FROM franchisee WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.franchiseeMessage.FRANCHISEE_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: getFranchiseeById`
    );
    throw new Error(error.message);
  }
};

// deleteFranchisee Service
module.exports.deleteFranchisee = async ({ id }) => {
  try {
    const query = `DELETE FROM franchisee WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.franchiseeMessage.FRANCHISEE_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: deleteFranchisee`
    );
    throw new Error(error.message);
  }
};

// updateFranchisee Service
module.exports.updateFranchisee = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "franchisee",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.franchiseeMessage.FRANCHISEE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : franchiseeServices: updateFranchisee`
    );
    throw new Error(error);
  }
};
