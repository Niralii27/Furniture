const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  costPrice: { type: Number, required: true }, 
  productImage: { type: String, required: true }, 
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);
