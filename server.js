const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");

// Start watching the .env files
dotEnv.config();

// Creating the app
const app = express();

// Setting middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/customers", require("./routes/customerRoutes"));
app.use("/api/v1/wishlists", require("./routes/wishlistRoutes"));
app.use("/api/v1/parentCategories", require("./routes/parCategoryRoutes"));
app.use("/api/v1/categories", require("./routes/categoryRoutes"));
app.use("/api/v1/childCategories", require("./routes/childCategoryRoutes"));
app.use("/api/v1/ranges", require("./routes/rangesRoutes"));
app.use("/api/v1/colors", require("./routes/colorRoutes"));
app.use("/api/v1/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/v1/products", require("./routes/productsRoutes"));
app.use("/api/v1/productImages", require("./routes/productImageRoutes"));
app.use("/api/v1/productColors", require("./routes/productColorRoutes"));
app.use("/api/v1/contactUs", require("./routes/contactUsRoutes"));
app.use(
  "/api/v1/experienceCentres",
  require("./routes/experienceCentreRoutes")
);
app.use("/api/v1/aboutUs", require("./routes/aboutUsRoutes"));
app.use("/api/v1/whyAwni", require("./routes/whyAwniRoutes"));
app.use("/api/v1/sliders", require("./routes/sliderRoutes"));
app.use("/api/v1/homepageBanners", require("./routes/homepageBannerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
