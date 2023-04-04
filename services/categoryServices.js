const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createCategory Service
module.exports.createCategory = async (serviceData) => {
  try {
    // let query = await helpers.createInsertQuery("categories", serviceData);

    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "categories",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("categories", serviceData);
    }

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : categoryServices: createCategory`
    );
    throw new Error(error);
  }
};

// getAllCategories Service
module.exports.getAllCategories = async ({
  skip = 0,
  limit = 10,
  par_cat_id,
  par_cat_slug = null,
  cat_id,
  cat_slug = null,
  query: searchQuery = "null",
}) => {
  try {
    let query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (searchQuery != "null") {
      query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE categories.name ILIKE '%${searchQuery}%' OR categories.slug ILIKE '%${searchQuery}%' LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (par_cat_id && par_cat_id != undefined && par_cat_id != null) {
      query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE categories.par_cat_id=${par_cat_id} LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (par_cat_slug && par_cat_slug != undefined && par_cat_slug != null) {
      query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE par_categories.slug=${par_cat_slug} LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (cat_id && cat_id != undefined && cat_id != null) {
      query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE categories.cat_id=${cat_id} LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (cat_slug && cat_slug != undefined && cat_slug != null) {
      query = `SELECT categories.id, categories.catalogue, categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, par_categories.slug as par_cat_slug, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE categories.slug=${cat_slug}' LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;

    let catWithProducts = [];
    if (fetchedData.length) {
      for (let i = 0; i < fetchedData.length; i++) {
        const productQuery = `SELECT * FROM products WHERE cat_id = ${fetchedData[i].id}`;
        const productResponseData = await pool.query(productQuery);
        const productData = productResponseData.rows;
        catWithProducts.push({ ...fetchedData[i], products: productData });
      }
    }

    return catWithProducts;
  } catch (error) {
    console.log(
      `Something went Wrong services : categoryServices: getAllCategories`
    );
    throw new Error(error.message);
  }
};

// getCategoryWithProducts Service
// module.exports.getCategoryWithProducts = async ({
//   skip = 0,
//   limit = 10,
//   par_cat_id,
//   cat_id,
// }) => {
//   try {
//     let query = `SELECT child_categories.id, child_categories.catalogue, child_categories.created_at, child_categories.status, child_categories.name, child_categories.image, child_categories.slug, par_categories.id as par_cat_id, par_categories.name as par_cat_name,  categories.id as cat_id, categories.name as cat_name FROM child_categories INNER JOIN par_categories ON par_categories.id = child_categories.par_cat_id INNER JOIN categories ON categories.id = child_categories.cat_id LIMIT ${parseInt(
//       limit
//     )} OFFSET ${parseInt(skip)}`;

//     if (par_cat_id && par_cat_id != undefined && par_cat_id != null) {
//       query = `SELECT child_categories.id, child_categories.catalogue, child_categories.created_at, child_categories.status, child_categories.name, child_categories.image, child_categories.slug, par_categories.id as par_cat_id, par_categories.name as par_cat_name,  categories.id as cat_id, categories.name as cat_name FROM child_categories INNER JOIN par_categories ON par_categories.id = child_categories.par_cat_id INNER JOIN categories ON categories.id = child_categories.cat_id WHERE child_categories.par_cat_id=${par_cat_id} LIMIT ${parseInt(
//         limit
//       )} OFFSET ${parseInt(skip)}`;
//     }

//     if (cat_id && cat_id != undefined && cat_id != null) {
//       query = `SELECT child_categories.id, child_categories.catalogue, child_categories.created_at, child_categories.status, child_categories.name, child_categories.image, child_categories.slug, par_categories.id as par_cat_id, par_categories.name as par_cat_name,  categories.id as cat_id, categories.name as cat_name FROM child_categories INNER JOIN par_categories ON par_categories.id = child_categories.par_cat_id INNER JOIN categories ON categories.id = child_categories.cat_id WHERE child_categories.cat_id=${cat_id} LIMIT ${parseInt(
//         limit
//       )} OFFSET ${parseInt(skip)}`;
//     }

//     const responseData = await pool.query(query);
//     const fetchedData = responseData.rows;

//     let catWithProducts = [];
//     if (fetchedData.length) {
//       for (let i = 0; i < fetchedData.length; i++) {
//         const productQuery = `SELECT * FROM products WHERE cat_id = ${fetchedData[i].id}`;
//         const productResponseData = await poll.query(productQuery);
//         const productData = productResponseData.rows;
//         if (productData.length) {
//           catWithProducts.push({ ...fetchedData[i], products: productData });
//         }
//       }
//     }

//     return catWithProducts;
//   } catch (error) {
//     console.log(
//       `Something went Wrong services : categoryServices: getCategoryWithProducts`
//     );
//     throw new Error(error.message);
//   }
// };

// getCategoryById Service
module.exports.getCategoryById = async ({ id }) => {
  try {
    // const query = `SELECT * FROM categories WHERE id = ${id}`;
    const query = `SELECT categories.id, categories.catalogue,categories.breadcrumb_banner, categories.created_at, categories.status, categories.name, par_categories.id as par_cat_id, par_categories.name as par_cat_name, categories.image, categories.slug FROM categories INNER JOIN par_categories ON par_categories.id = categories.par_cat_id WHERE categories.id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : categoryServices: getCategoryById`
    );
    throw new Error(error.message);
  }
};

// deleteCategory Service
module.exports.deleteCategory = async ({ id }) => {
  try {
    const query = `DELETE FROM categories WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;

    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : categoryServices: deleteCategory`
    );
    throw new Error(error.message);
  }
};

// updateCategory Service
module.exports.updateCategory = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "categories",
      `id=${id}`,
      body
    );

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : categoryServices: updateCategory`
    );
    throw new Error(error);
  }
};
