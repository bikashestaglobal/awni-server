const constaints = require("../constants");
const wishlistServices = require("../services/wishlistServices");

// createWishlist Controller
module.exports.createWishlist = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await wishlistServices.createWishlist({
      ...req.body,
      customer_id: req.params.customerId,
    });
    response.status = 200;
    response.message = constaints.wishlistMessage.WISHLIST_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : wishlistController: createWishlist`
    );
  }
  res.status(response.status).send(response);
};

// getAllWishlists Controller
module.exports.getAllWishlists = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await wishlistServices.getAllWishlists({
      ...req.query,
      ...req.params,
    });
    response.status = 200;
    response.message = constaints.wishlistMessage.WISHLIST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : wishlistController: getAllWishlists`
    );
  }
  res.status(response.status).send(response);
};

// myWishlists Controller
module.exports.myWishlists = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await wishlistServices.myWishlists({
      ...req.query,
      ...req.params,
    });
    response.status = 200;
    response.message = constaints.wishlistMessage.WISHLIST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : wishlistController: myWishlists`
    );
  }
  res.status(response.status).send(response);
};

// getWishlistById Controller
// module.exports.getWishlistById = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await wishlistServices.getWishlistById(
//       req.params
//     );
//     response.status = 200;
//     response.message = constaints.wishlistMessage.WISHLIST_FETCHED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : wishlistController: getWishlistById`
//     );
//   }
//   res.status(response.status).send(response);
// };

// deleteWishlist Controller
module.exports.deleteWishlist = async (req, res) => {
  const response = { ...constaints.defaultServerResponse };
  try {
    const responseFromService = await wishlistServices.deleteWishlist(
      req.params
    );
    response.status = 200;
    response.message = constaints.wishlistMessage.WISHLIST_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
    response.errors = { message: error.message };
    console.log(
      `Something went Wrong controller : wishlistController: deleteWishlist`
    );
  }
  res.status(response.status).send(response);
};

// updateWishlist Controller
// module.exports.updateWishlist = async (req, res) => {
//   const response = { ...constaints.defaultServerResponse };
//   try {
//     const responseFromService = await wishlistServices.updateWishlist({
//       id: req.params.id,
//       body: req.body,
//     });
//     response.status = 200;
//     response.message = constaints.wishlistMessage.WISHLIST_UPDATED;
//     response.body = responseFromService;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = { message: error.message };
//     console.log(
//       `Something went Wrong controller : wishlistController: updateWishlist`
//     );
//   }
//   res.status(response.status).send(response);
// };
