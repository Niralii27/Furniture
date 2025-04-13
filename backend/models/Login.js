const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  lastName: {type: String, required: false},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },             // Phone
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  token: { type: String, default: null, required: false },
  userImage: { type: String, required: false },        // User_Image (optional)
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Login", UserSchema);
