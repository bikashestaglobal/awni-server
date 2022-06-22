const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createProductColor Service
module.exports.createProductColor = async (serviceData) => {
  try {
    // const query = await helpers.createInsertQuery(
    //   "product_images",
    //   serviceData
    // );
    let values = "";
    serviceData.colors.map((item) => {
      values += `( ${serviceData.product_id}, '${item}' ),`;
    });

    const query = `INSERT INTO product_colors(product_id, color_id) VALUES ${values.slice(
      0,
      values.length - 1
    )} RETURNING *`;

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: createProductColor`
    );
    throw new Error(error);
  }
};

// getAllProductColors Service
module.exports.getAllProductColors = async ({
  skip = 0,
  limit = 10,
  product_id = null,
}) => {
  try {
    let query = `SELECT * FROM product_colors LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (product_id != null) {
      query = `SELECT product_colors.*, colors.name FROM product_colors JOIN colors ON product_colors.color_id = colors.id WHERE product_id=${product_id} LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData;
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: getAllProductColors`
    );
    throw new Error(error.message);
  }
};

// getProductColorById Service
module.exports.getProductColorById = async ({ id }) => {
  try {
    const query = `SELECT * FROM product_colorss WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: getProductColorById`
    );
    throw new Error(error.message);
  }
};

// deleteProductColor Service
module.exports.deleteProductColor = async ({ id }) => {
  try {
    const query = `DELETE FROM product_colors WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: deleteProductColor`
    );
    throw new Error(error.message);
  }
};

// deleteProductColorByProductId Service
module.exports.deleteProductColorByProductId = async ({ product_id }) => {
  try {
    const query = `DELETE FROM product_colors WHERE product_id = ${product_id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: deleteProductColorByProductId`
    );
    throw new Error(error.message);
  }
};

// updateProductColor Service
module.exports.updateProductColor = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "product_colors",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.productColorMessage.PRODUCT_COLOR_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productColorServices: updateProductColor`
    );
    throw new Error(error);
  }
};
