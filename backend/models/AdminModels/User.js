const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },         // First_Name
  lastName: { type: String, required: true },          // Last_Name
  email: { type: String, required: true, unique: true }, // Email
  phone: { type: String, required: true },             // Phone
  password: { type: String, required: true },          // Password
  userImage: { type: String, required: false },        // User_Image (optional)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
