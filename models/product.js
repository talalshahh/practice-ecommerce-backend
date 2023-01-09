const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timeStamps: true }
);

module.exports.Products = mongoose.model("product", ProductSchema);
