const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },         // First_Name
  email: { type: String, required: true}, // Email
  phone: { type: String, required: true },    
  subject: { type: String, require: true},
  message: { type: String, require: true},         // Phone
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactSchema);