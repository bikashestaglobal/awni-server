const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// createAdmin Service
module.exports.createAdmin = async (serviceData) => {
  try {
    //  Check admin is exists or not

    const chceckQuery = await helpers.createFindQuery("admins", {
      email: serviceData.email,
    });

    const responseAdminData = await pool.query(chceckQuery);
    const adminData = responseAdminData.rows;
    if (adminData.length) {
      throw new Error(constants.adminMessage.ADMIN_EXIST);
    }

    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);
    const query = await helpers.createInsertQuery("admins", serviceData);
    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.adminMessage.ADMIN_NOT_CREATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : adminServices: createAdmin`);
    throw new Error(error);
  }
};

// adminLogin Service
module.exports.adminLogin = async (serviceData) => {
  try {
    // Find admin
    const chceckQuery = await helpers.createFindQuery("admins", {
      email: serviceData.email,
    });

    const responseData = await pool.query(chceckQuery);
    const fetchedData = responseData.rows;

    if (fetchedData.length) {
      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        fetchedData[0].password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: fetchedData[0].id },
          process.env.JWT_SECRET_KEY || "my-secret-key"
        );
        return { ...fetchedData[0], token };
      } else {
        throw new Error(constants.authMessage.INVALID_PASSWORD);
      }
    } else {
      throw new Error(constants.authMessage.INVALID_EMAIL);
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminService: login`);
    throw new Error(error.message);
  }
};

// updateAdmin Service
module.exports.updateAdmin = async ({ id, body }) => {
  try {
    // If Password available
    if (
      body.password &&
      body.password != "null" &&
      body.password != "undefined"
    ) {
      // Hash Password
      body.password = await bcryptjs.hash(body.password, 12);
    }

    const query = await helpers.createUpdateQuery("admins", `id=${id}`, body);
    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.adminMessage.ADMIN_NOT_UPDATED);
    }
  } catch (error) {
    console.log(`Something went Wrong services : adminServices: updateAdmin`);
    throw new Error(error);
  }
};
