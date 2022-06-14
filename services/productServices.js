const constants = require("../constants");
const pool = require("../database/db");
const helpers = require("../helpers");
// createProduct Service
module.exports.createProduct = async (serviceData) => {
  try {
    console.log(serviceData);
    const query = await helpers.createInsertQuery("products", serviceData);

    const responseData = await pool.query(query);
    const createdData = responseData.rows;
    if (createdData.length) {
      return createdData[0];
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: createProduct`
    );
    throw new Error(error);
  }
};

// getAllProducts Service
module.exports.getAllProducts = async ({
  parCatSlug = "undefined",
  subCatSlug = "undefined",
  childCatSlug = "undefined",
  range_id = "undefined",
  skip = 0,
  limit = 10,
  min = 0,
  max = 5000000,
  query: searchQuery = "null",
  status = true,
}) => {
  try {
    let query = ``;
    let rangeQuery = ``;
    if (range_id != "undefined") {
      rangeQuery = `AND range_id=${parseInt(range_id)}`;
    }

    if (parCatSlug != "undefined") {
      query = `SELECT * FROM products WHERE par_cat_id IN (SELECT id from par_categories WHERE slug='${parCatSlug}') AND selling_price <= ${max} AND selling_price >= ${min} ${
        rangeQuery ? rangeQuery : ""
      } AND status='${status}' ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (subCatSlug != "undefined") {
      query = `SELECT * FROM products WHERE cat_id IN (SELECT id from categories WHERE slug='${subCatSlug}') AND selling_price <= ${max} AND selling_price >= ${min} ${
        rangeQuery ? rangeQuery : ""
      } AND status='${status}' ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (childCatSlug != "undefined") {
      query = `SELECT * FROM products WHERE child_cat_id IN (SELECT id from child_categories WHERE slug='${childCatSlug}') AND selling_price <= ${max} AND selling_price >= ${min} ${
        rangeQuery ? rangeQuery : ""
      } AND status='${status}' ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (parCatSlug == "undefined" && subCatSlug == "undefined") {
      query = `SELECT * FROM products WHERE ${
        status == "all" ? "" : `status = '${status}' AND`
      }  selling_price <= ${max} AND selling_price >= ${min} ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(skip)}`;
    }

    if (searchQuery != "null") {
      query = `SELECT * FROM products WHERE name ILIKE '%${searchQuery}%' OR slug ILIKE '%${searchQuery}%' OR size ILIKE '%${searchQuery}%' OR weight ILIKE '%${searchQuery}%' OR code ILIKE '%${searchQuery}%' OR mrp::text ILIKE '%${searchQuery}%' OR selling_price::text ILIKE '%${searchQuery}%' ORDER BY created_at DESC`;
    }

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;
    // console.log(fetchedData);
    return fetchedData;
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: getAllProducts`,
      error
    );
    throw new Error(error.message);
  }
};

// getProductById Service
module.exports.getProductById = async ({ id }) => {
  try {
    const query = `SELECT products.*, par_categories.name as par_cat_name, par_categories.id as par_cat_id, categories.name as cat_name, categories.id as cat_id, child_categories.name as child_cat_name, child_categories.id as child_cat_id, ranges.id as range_id, ranges.name as range_name FROM products LEFT JOIN par_categories ON products.par_cat_id = par_categories.id LEFT JOIN categories ON categories.id = products.cat_id LEFT JOIN child_categories ON child_categories.id = products.child_cat_id LEFT JOIN ranges ON products.range_id = ranges.id WHERE products.id = ${id}`;

    const responseData = await pool.query(query);

    const fetchedData = responseData.rows;
    if (fetchedData.length) {
      return fetchedData[0];
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: getProductById`
    );
    throw new Error(error.message);
  }
};

// getProductById Service
module.exports.getProductBySlug = async ({ slug }) => {
  try {
    // const query = await helpers.createFindQuery("products", { slug });
    const query = `SELECT products.*, ranges.name as range_name, categories.catalogue as catalogue FROM products LEFT JOIN ranges ON ranges.id = products.range_id LEFT JOIN categories ON categories.id = products.cat_id WHERE products.slug = '${slug}'`;

    const responseData = await pool.query(query);
    const fetchedData = responseData.rows;

    if (fetchedData.length) {
      const product = fetchedData[0];
      // get all product images
      const queryForImage = await helpers.createFindQuery("product_images", {
        product_id: product.id,
      });
      const responseImageData = await pool.query(queryForImage);
      product.images = responseImageData.rows || [];

      // get all product Colors
      // const queryForColors = await helpers.createFindQuery("product_colors", {
      //   product_id: product.id,
      // });
      const queryForColors = `SELECT product_colors.*, colors.name FROM product_colors INNER JOIN colors ON product_colors.color_id = colors.id WHERE product_colors.product_id= ${product.id}`;

      const responseColorData = await pool.query(queryForColors);

      product.colors = responseColorData.rows || [];

      // Get New Arrivals
      const queryForNewArival = await helpers.createFindQuery(
        "products",
        {
          cat_id: product.cat_id,
        },
        4
      );
      const responseNewArivalData = await pool.query(queryForNewArival);
      product.newArrivals = responseNewArivalData.rows || [];

      return product;
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: getProductById`
    );
    throw new Error(error.message);
  }
};

// deleteProduct Service
module.exports.deleteProduct = async ({ id }) => {
  try {
    const query = `DELETE FROM products WHERE id = ${id} RETURNING *`;

    const responseData = await pool.query(query);
    const deleteddData = responseData.rows;
    console.log(deleteddData);
    if (deleteddData.length) {
      return deleteddData[0];
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_DELETED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: deleteProduct`
    );
    throw new Error(error.message);
  }
};

// updateProduct Service
module.exports.updateProduct = async ({ id, body }) => {
  try {
    const query = await helpers.createUpdateQuery("products", `id=${id}`, body);

    const responseData = await pool.query(query);
    const updatedData = responseData.rows;
    if (updatedData.length) {
      return updatedData[0];
    } else {
      throw new Error(constants.productMessage.PRODUCT_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Something went Wrong services : productServices: updateProduct`
    );
    throw new Error(error);
  }
};
