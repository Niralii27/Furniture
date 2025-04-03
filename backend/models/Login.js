const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  token: { type: String, default: null, required: false },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Login", UserSchema);
