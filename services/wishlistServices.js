const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");

// createWishlist Service
module.exports.createWishlist = async (serviceData) => {
  try {
    const query = await helpers.createInsertQuery("wishlists", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.wishlistMessage.WISHLIST_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : wishlistServices: createWishlist`
    );
    throw new Error(error);
  }
};

// getAllWishlists Service
module.exports.getAllWishlists = async ({
  skip = 0,
  limit = 10,
  customer_id,
}) => {
  try {
    const query = `SELECT wishlists.*, products.slug, products.default_image, products.name as product_name, products.selling_price FROM wishlists JOIN products ON products.id = wishlists.product_id JOIN customers ON customers.id = wishlists.customer_id WHERE customer_id = ${customer_id} LIMIT  ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : wishlistServices: getAllWishlists`
    );
    throw new Error(error.message);
  }
};

// myWishlists Service
module.exports.myWishlists = async ({ skip = 0, limit = 10, customerId }) => {
  try {
    const query = `SELECT wishlists.*, products.slug, products.default_image, products.name as product_name, products.selling_price FROM wishlists JOIN products ON products.id = wishlists.product_id JOIN customers ON customers.id = wishlists.customer_id WHERE customer_id = ${customerId} LIMIT  ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : wishlistServices: myWishlists`
    );
    throw new Error(error.message);
  }
};

// getWishlistById Service
// module.exports.getWishlistById = async ({ id }) => {
//   try {
//     const query = `SELECT * FROM wishlists WHERE id = ${id}`;

//     const responseData = await pool.query(query);
//     const fetchedData = responseData.rows;
//     if (fetchedData.length) {
//       return fetchedData[0];
//     } else {
//       throw new Error(constants.wishlistMessage.WISHLIST_NOT_FOUND);
//     }
//   } catch (error) {
//     console.log(
//       `Something went Wrong services : experience
//       CentreServices: getWishlistById`
//     );
//     throw new Error(error.message);
//   }
// };

// deleteWishlist Service
module.exports.deleteWishlist = async ({ id }) => {
  try {
    const query = `DELETE FROM wishlists WHERE product_id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.wishlistMessage.WISHLIST_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : wishlistServices: deleteWishlist`
    );
    throw new Error(error.message);
  }
};

// updateWishlist Service
// module.exports.updateWishlist = async ({ id, body }) => {
//   try {
//     const query = await helpers.createUpdateQuery("wishlists", `id=${id}`, body);

//     const responseData = await pool.query(query);
//     const updatedData = responseData.rows;
//     if (updatedData.length) {
//       return updatedData[0];
//     } else {
//       throw new Error(constants.wishlistMessage.WISHLIST_NOT_UPDATED);
//     }
//   } catch (error) {
//     console.log(
//       `Something went Wrong services : wishlistServices: updateWishlist`
//     );
//     throw new Error(error);
//   }
// };
