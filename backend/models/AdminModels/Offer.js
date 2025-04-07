const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  offerDescription: { type: String, required: true },       // Offer_Description
  offerCode: { type: String, required: true, unique: true },// Offer_Code
  discount: { type: Number, required: true },               // Discount (percentage or amount)
  maxDiscountAmount: { type: Number, required: true },      // Maximum_Discount_Amount
  minDiscountAmount: { type: Number, required: true },      // Minimum_Discount_Amount
  startDate: { type: Date, required: true },                // Start_Date
  endDate: { type: Date, required: true },                  // End_Date
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Offer", OfferSchema);
