const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createCategory Service
module.exports.createCategory = async (serviceData) => {
  try {
    let query = "";
    if (serviceData.array) {
      if (Array.isArray(serviceData.array)) {
        query = await helpers.createMultyInsertQuery(
          "par_categories",
          serviceData.array
        );
      }
    } else {
      query = await helpers.createInsertQuery("par_categories", serviceData);
    }
    // let query = `INSERT INTO par_categories(${Object.keys(
    //   serviceData
    // )}) VALUES(${Object.values(serviceData).map(
    //   (item) => `'${item}'`
    // )}) RETURNING *`;

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: createCategory`
    );
    throw new Error(error);
  }
};

// getAllCategories Service
module.exports.getAllCategories = async ({
  skip = 0,
  limit = 10,
  query = "null",
}) => {
  try {
    let searchQuery = `SELECT * FROM par_categories ORDER BY created_at DESC LIMIT ${parseInt(
      limit
    )} OFFSET ${parseInt(skip)}`;

    if (query != "null") {
      searchQuery = `SELECT * FROM par_categories WHERE name ILIKE '%${query}%' OR slug ILIKE '%${query}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(searchQuery);
    const fetchedData = responseData.rows;
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: getAllCategories`
    );
    throw new Error(error.message);
  }
};

// getAllProducts Service
module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
  try {
    // Find 5 categories
    const categoryQuery = "SELECT * FROM par_categories LIMIT 5";
    const categoryResponseData = await pool.query(categoryQuery);
    const categories = categoryResponseData.rows;

    // find products for each category
    const categoryProducts = [];
    if (categories.length) {
      for (let i = 0; i < categories.length; i++) {
        const productQuery = `SELECT * FROM products WHERE par_cat_id = ${categories[i].id} AND status = 'true' LIMIT 4`;
        const productResponseData = await pool.query(productQuery);
        const products = productResponseData.rows;
        if (products.length) {
          categoryProducts.push({ ...categories[i], products: products || [] });
        }
      }
    }

    return categoryProducts;
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: getAllProducts`
    );
    throw new Error(error.message);
  }
};

// getSubCategories Service
module.exports.getSubCategories = async ({ skip = 0, limit = 10 }) => {
  try {
    // Find 5 categories
    const categoryQuery = "SELECT * FROM par_categories";
    const categoryResponseData = await pool.query(categoryQuery);
    const categories = categoryResponseData.rows;

    // find sub Category for each category
    const categoryData = [];
    if (categories.length) {
      for (let i = 0; i < categories.length; i++) {
        const subCatQuery = `SELECT * FROM categories WHERE par_cat_id = ${categories[i].id}`;
        const subCatResponseData = await pool.query(subCatQuery);
        const subCats = subCatResponseData.rows;
        if (subCats.length) {
          categoryData.push({ ...categories[i], subCategories: subCats || [] });
        } else {
          categoryData.push({ ...categories[i], subCategories: [] });
        }
      }
    }

    return categoryData;
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: getSubCategories`
    );
    throw new Error(error.message);
  }
};

// getChildCategories Service
module.exports.getChildCategories = async ({ skip = 0, limit = 10 }) => {
  try {
    // Find 5 categories
    const categoryQuery = "SELECT * FROM par_categories";
    const categoryResponseData = await pool.query(categoryQuery);
    const categories = categoryResponseData.rows;

    // find sub Category for each category
    const categoryData = [];

    if (categories.length) {
      for (let i = 0; i < categories.length; i++) {
        // Getting sub category
        const subCatQuery = `SELECT * FROM categories WHERE par_cat_id = ${categories[i].id}`;
        const subCatResponseData = await pool.query(subCatQuery);
        const subCats = subCatResponseData.rows;
        const subCategoryData = [];
        if (subCats.length) {
          for (let j = 0; j < subCats.length; j++) {
            // Getting Child Category
            const childCatQuery = `SELECT * FROM child_categories WHERE cat_id = ${subCats[j].id}`;
            const childCatResponseData = await pool.query(childCatQuery);
            const childCats = childCatResponseData.rows;
            subCategoryData.push({
              ...subCats[j],
              childCategories: childCats || [],
            });
          }

          categoryData.push({
            ...categories[i],
            subCategories: subCategoryData || [],
          });
        } else {
          categoryData.push({
            ...categories[i],
            subCategories: [],
          });
        }
      }
    }

    return categoryData;
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: getChildCategories`
    );
    throw new Error(error.message);
  }
};

// getCategoryById Service
module.exports.getCategoryById = async ({ id }) => {
  try {
    const query = `SELECT * FROM par_categories WHERE id = ${id}`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: getCategoryById`
    );
    throw new Error(error.message);
  }
};

// deleteCategory Service
module.exports.deleteCategory = async ({ id }) => {
  try {
    const query = `DELETE FROM par_categories WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.categoryMessage.CATEGORY_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : parCategoryServices: deleteCategory`
    );
    throw new Error(error.message);
  }
};

// updateCategory Service
module.exports.updateCategory = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery(
      "par_categories",
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
      `Something went Wrong services : parCategoryServices: updateCategory`
    );
    throw new Error(error);
  }
};
