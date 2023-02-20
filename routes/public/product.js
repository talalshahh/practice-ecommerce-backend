const express = require("express");
const { default: mongoose } = require("mongoose");
const { Products } = require("../../models/product");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const productData = await Products.find();
  if (!productData) {
    return res.status(404).send("Product Data not found");
  }
  res.status(200).send(productData);
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const productData = await Products.findById(mongoose.Types.ObjectId(id));
  if (!productData) {
    return res.status(404).send("Product Data not found");
  }
  res.status(200).send(productData);
});

router.post("/add", async (req, res, next) => {
  const { productData } = req.body;
  const productInstance = new Products({
    name: productData.name,
    price: productData.price,
    image: productData.file,
  });
  const productSaved = await productInstance.save();
  if (!productSaved) {
    return res.status(401).send("Product not stored successfully");
  }
  res.status(200).send(productSaved);
});
router.put("/:id", async (req, res, next) => {
  const { productData } = req.body;
  const { id } = req.params;
  const productUpdated = await Products.findByIdAndUpdate(id, {
    name: productData.name,
    price: productData.price,
    image: productData.file,
  });
  if (!productUpdated) {
    return res.status(401).send("Product not stored successfully");
  }
  res.status(200).send(productUpdated);
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const productDeleted = await Products.findByIdAndDelete(id);
  if (!productDeleted) {
    return res.status(401).send("Product not deleted successfully");
  }
  res.status(200).send(productDeleted);
});

module.exports = router;
