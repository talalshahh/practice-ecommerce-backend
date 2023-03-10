const express = require("express");
const productRoutes = require("./public/product");

const router = express.Router();

router.use("/products", productRoutes);

module.exports = router;
