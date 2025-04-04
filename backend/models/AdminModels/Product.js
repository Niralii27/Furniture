const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  costPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stockQuantity: { type: Number, required: true },
  productImage: { type: String, required: false }, 
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
