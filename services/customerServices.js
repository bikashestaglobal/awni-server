const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register Service
module.exports.register = async (serviceData) => {
  try {
    //  Check customer is exists or not
    const chceckQuery = await helpers.createFindQuery("customers", {
      email: serviceData.email,
    });

    const responseCustomerData = await pool.query(chceckQuery);
    const customerData = responseCustomerData.rows;
    // if (customerData.length) {
    //   throw new Error(constants.customerMessage.CUSTOMER_EXIST);
    // }

    // If data exists and not verified
    if (customerData[0] && !customerData[0].is_verified) {
      // Send Email
      helpers.sendOTPEmail({
        emailTo: serviceData.email,
        subject: "OTP Verification",
        name: serviceData.name,
        otp: serviceData.otp,
      });
      throw new Error(constants.authMessage.NEED_VERIFICATION);
    }

    // If data exists and verified
    if (customerData[0] && customerData[0].is_verified) {
      throw new Error(constants.authMessage.NEED_LOGIN);
    }

    // Send Email
    helpers.sendOTPEmail({
      emailTo: serviceData.email,
      subject: "OTP Verification",
      name: serviceData.name,
      otp: serviceData.otp,
    });

    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);

    // delete otp from serviceData
    delete serviceData.otp;
    const query = await helpers.createInsertQuery("customers", serviceData);
    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: createCustomer ${error}`
    );
    throw new Error(error);
  }
};

// socialRegistration Service
module.exports.socialRegistration = async (serviceData) => {
  try {
    //  Check customer is exists or not
    const chceckQuery = await helpers.createFindQuery("customers", {
      email: serviceData.email,
    });

    const responseCustomerData = await pool.query(chceckQuery);
    const customerData = responseCustomerData.rows;
    // if (customerData.length) {
    //   throw new Error(constants.customerMessage.CUSTOMER_EXIST);
    // }

    // If data exists
    if (customerData[0]) {
      // Sign jwt token
      const token = jwt.sign(
        { id: customerData[0].id },
        process.env.JWT_SECRET_KEY || "my-secret-key"
      );
      return { ...customerData[0], token };
    }

    const query = await helpers.createInsertQuery("customers", serviceData);
    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      const token = jwt.sign(
        { id: createdData[0].id },
        process.env.JWT_SECRET_KEY || "my-secret-key"
      );
      return { ...createdData[0], token };
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: createCustomer ${error}`
    );
    throw new Error(error);
  }
};

// verifyAccount Service
module.exports.verifyAccount = async ({ email }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "customers",
      `email='${email}'`,
      { is_verified: "true" }
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_VERIFICATION_FAILED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: verifyAccount`
    );
    throw new Error(error);
  }
};

// login Service
module.exports.login = async (serviceData) => {
  try {
    // Find admin
    // const chceckQuery = await helpers.createFindQuery("customers", {
    //   email: serviceData.email,
    // });

    const chceckQuery = `SELECT * FROM customers WHERE email = '${serviceData.email}' OR mobile = '${serviceData.email}'`;

    const responseData = await pool.query(chceckQuery);
    const fetchedData = responseData.rows;

    if (fetchedData.length) {
      //  check account is active or not
      if (!fetchedData[0].status) {
        // Send Email
        throw new Error(constants.authMessage.ACCOUNT_DESABLED);
      }

      // Check account is verified or not
      if (!fetchedData[0].is_verified) {
        // Send Email
        helpers.sendOTPEmail({
          emailTo: serviceData.email,
          subject: "OTP Verification",
          name: serviceData.name,
          otp: serviceData.otp,
        });
        throw new Error(constants.authMessage.NEED_VERIFICATION);
      }

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
    console.log(`Something went wrong Service: customerServices: login`);
    throw new Error(error.message);
  }
};

// findAccount Service
module.exports.findAccount = async (serviceData) => {
  try {
    // Find Account
    const chceckQuery = await helpers.createFindQuery("customers", {
      email: serviceData.email,
    });

    const responseData = await pool.query(chceckQuery);
    const fetchedData = responseData.rows;

    if (fetchedData.length) {
      helpers.sendOTPEmail({
        emailTo: serviceData.email,
        subject: "OTP Verification",
        name: fetchedData[0].name,
        otp: serviceData.otp,
      });
      return fetchedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerServices: findAccount`);
    throw new Error(error.message);
  }
};

// getAllCustomers Service
module.exports.getAllCustomers = async ({
  skip = 0,
  limit = 10,
  query = "null",
  is_verified = "null",
  status = "null",
  start_date = "null",
  end_date = "null",
}) => {
  try {
    // const query = `SELECT categories.id, categories.catalogue, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id LIMIT ${parseInt(
    //   limit
    // )} OFFSET ${parseInt(skip)}`;
    let whereCondition = `WHERE status='${status != "null" ? status : true}'`;
    let orderBy = "ORDER BY created_at DESC";
    let searchQuery = ``;

    // Filter data
    if (is_verified != "null") {
      whereCondition = `${whereCondition} AND is_verified='${is_verified}'`;
    }

    if (status != "null") {
      whereCondition = `${whereCondition} AND status='${status}'`;
    }

    if (start_date != "null" && end_date == "null") {
      whereCondition = `${whereCondition} AND CAST(created_at AS DATE)='${start_date}'`;
    }

    if (start_date != "null" && end_date != "null") {
      whereCondition = `${whereCondition} AND created_at BETWEEN '${start_date}' AND '${end_date}'`;
    }

    searchQuery = `SELECT * FROM customers ${whereCondition} ${orderBy} LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    // Searching Query
    if (query != "null") {
      searchQuery = `SELECT * FROM customers WHERE name ILIKE '%${query}%' OR mobile ILIKE '%${query}%' OR email ILIKE '%${query}%'`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: getAllCustomers`
    );
    throw new Error(error.message);
  }
};

// getCustomerById Service
module.exports.getCustomerById = async ({ id }) => {
  try {
    const query = `SELECT * FROM customers WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: getCustomerById`
    );
    throw new Error(error.message);
  }
};

// myProfile Service
module.exports.myProfile = async ({ customerId }) => {
  try {
    const query = `SELECT * FROM customers WHERE id = ${customerId}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
  } catch (error) {
    console.log(`Something went Wrong services : customerServices: myProfile`);
    throw new Error(error.message);
  }
};

// deleteCustomer Service
module.exports.deleteCustomer = async ({ id }) => {
  try {
    const query = `DELETE FROM customers WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customersServices: deleteCustomer`
    );
    throw new Error(error.message);
  }
};

// updateCustomer Service
module.exports.updateCustomer = async ({ id, body }) => {
  try {
    // if (body.password != "") {
    //   body.password = await bcryptjs.hash(body.password, 12);
    // }

    const query = await helpers.createUpdateQuery(
      "customers",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_UPDATE);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: updateCustomer`
    );
    throw new Error(error);
  }
};

// updateProfile Service
module.exports.updateProfile = async ({ id, body }) => {
  try {
    if (body.password && body.password != "") {
      body.password = await bcryptjs.hash(body.password, 12);
    }

    const query = await helpers.createUpdateQuery(
      "customers",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_UPDATE);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: updateProfile`
    );
    throw new Error(error);
  }
};

// createNewPassword Service
module.exports.createNewPassword = async ({ id, password }) => {
  try {
    if (password != "") {
      password = await bcryptjs.hash(password, 12);
    }

    const query = await helpers.createUpdateQuery("customers", `id=${id}`, {
      password,
    });

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_UPDATE);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : customerServices: createNewPassword`
    );
    throw new Error(error);
  }
};

// resendOTP Service
module.exports.resendOTP = async ({ email, otp, name }) => {
  try {
    helpers.sendOTPEmail({
      emailTo: email,
      subject: "OTP Verification",
      name: name || "Dear",
      otp: otp,
    });
    return {};
  } catch (error) {
    console.log(`Something went Wrong services : customerServices: resendOTP`);
    throw new Error(error);
  }
};
