const express = require("express");
const productRouters = require("./public/product");

const router = express.Router();

router.use("/products", productRouters);

module.exports = router;
