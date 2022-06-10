const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createProductImage Service
module.exports.createProductImage = async (serviceData) => {
  try {
    // const query = await helpers.createInsertQuery(
    //   "product_images",
    //   serviceData
    // );
    let values = "";
    serviceData.urls.map((item) => {
      values += `( ${serviceData.product_id}, '${item}' ),`;
    });

    const query = `INSERT INTO product_images(product_id, url) VALUES ${values.slice(
      0,
      values.length - 1
    )} RETURNING *`;

    console.log(serviceData, values, query);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.productImageMessage.PRODUCT_IMG_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productImageServices: createProductImage`
    );
    throw new Error(error);
  }
};

// getAllProductImages Service
module.exports.getAllProductImages = async ({
  skip = 0,
  limit = 10,
  product_id = null,
}) => {
  try {
    let query = `SELECT * FROM product_images LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (product_id != null) {
      query = `SELECT * FROM product_images WHERE product_id=${product_id} LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData;
    } else {
      throw new Error(constants.productImageMessage.PRODUCT_IMG_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productImageServices: getAllProductImages`
    );
    throw new Error(error.message);
  }
};

// getProductImageById Service
module.exports.getProductImageById = async ({ id }) => {
  try {
    const query = `SELECT * FROM product_images WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.productImageMessage.PRODUCT_IMG_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productImageServices: getProductImageById`
    );
    throw new Error(error.message);
  }
};

// deleteProductImage Service
module.exports.deleteProductImage = async ({ id }) => {
  try {
    const query = `DELETE FROM product_images WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.productImageMessage.PRODUCT_IMG_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productImageServices: deleteProductImage`
    );
    throw new Error(error.message);
  }
};

// updateProductImage Service
module.exports.updateProductImage = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "product_images",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.productImageMessage.PRODUCT_IMG_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productImageServices: updateProductImage`
    );
    throw new Error(error);
  }
};
