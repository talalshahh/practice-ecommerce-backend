const express = require("express");
const { mongoose } = require("mongoose");
const { Cart } = require("../../models/cart");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  // console.log(id, "id");
  const { id } = req.params;
  const cartProduct = await Cart.findOne({ userId: id });
  if (!cartProduct) {
    return res.status(404).send("Cart Data not Found");
  }
  res.status(200).send(cartProduct);
});
router.put("/:id", async (req, res, next) => {
  const { cartData } = req.body;
  const { id } = req.params;
  // when we want to search on base of more than one thing  we will use findOneAndUpdate

  const quantityUpdated = await Cart.findOneAndUpdate(
    // well we use "products.productId" because it is predefined syntax

    { _id: id, "products.productId": cartData.productId },

    // $set sign is used to update array object
    {
      totalItems: cartData.totalItems,
      totalPrice: cartData.totalPrice,
      $set: { "products.$.quantity": cartData.quantity },
    }
  );
  if (!quantityUpdated) {
    return res.status(401).send("Product quantity is not updated");
  }
  res.status(200).send(quantityUpdated);
});

router.post("/", async (req, res, next) => {
  const { cartData } = req.body;
  const cartExists = await Cart.find({ userId: cartData.userId });
  if (cartExists.length) {
    // array [0] is used because aray can not be access without index

    const cartItemsTotal = cartExists[0].totalItems + cartData.totalItems;
    const cartItemsCost = cartExists[0].totalPrice + cartData.totalPrice;

    // delete is used to remove object properties
    delete cartData.totalPrice;
    delete cartData.totalItems;

    // push is used to update an array without replace it add the new thing
    const updateProduct = { $push: { products: cartData.products[0] } };
    delete cartData.products;
    const updateCart = await Cart.findByIdAndUpdate(cartExists[0]._id, {
      // ... is spread operator is used to copy array and objects

      ...cartData,
      totalItems: cartItemsTotal,
      totalPrice: cartItemsCost,
      ...updateProduct,
    });
    if (!updateCart) {
      return res.status(404).send("Cart Not Updated sucessfully");
    }
    return res.status(200).send(updateCart);
  } else {
    const cartInstance = new Cart({
      ...cartData,
    });
    const cartSaved = await cartInstance.save();
    if (!cartSaved) {
      return res.status(404).send("Cart is not saved");
    }
    return res.status(200).send(cartSaved);
  }
});

module.exports = router;
