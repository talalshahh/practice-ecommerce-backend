const express = require("express");
const { mongoose } = require("mongoose");
const { Cart } = require("../../models/cart");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  console.log(id, "id");
  const cartProduct = await Cart.find({ userId: id });
  if (!cartProduct) {
    return res.status(404).send("Cart Data not Found");
  }
  res.status(200).send(cartProduct);
});
router.post("/", async (req, res, next) => {
  const { cartData } = req.body;
  const cartExists = await Cart.find({ userId: cartData.userId });
  if (cartExists.length) {
    const cartItemsTotal = cartExists[0].totalItems + cartData.totalItems;
    const cartItemsCost = cartExists[0].totalPrice + cartData.totalPrice;

    // delete is used to remove object properties
    delete cartData.price;
    delete cartData.totalItems;

    // push is used to update an array without replace it add the new thing
    const updateProduct = { $push: { products: cartData.products[0] } };
    delete cartData.products;
    const updateCart = await Cart.findByIdAndUpdate(cartExists[0].id, {
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
