const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: "Login", 
required: true
  },
  orderDate: {type: Date,required: true},products: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId,ref: "Product", },
      quantity: {type: Number,required: true,min: 1},
    }
  ],
  firstName: { type: String,required: true},
  lastName: {type: String,required: true},
  address: {type: String,required: true},
  city: {type: String,required: true},
  state: {type: String,required: true},
  pinCode: {type: String,required: true},
  phone: {type: String,required: true},
  shippingCharge: {type: Number,required: true},
  total: {type: Number, required: true},
  payment_mode: {type: String, required: true},
  status: {type: String,enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],default: "Pending"},
  createdAt: {type: Date,default: Date.now}
});

module.exports = mongoose.model("Order", OrderSchema);
