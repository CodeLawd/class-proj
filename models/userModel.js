const { Schema, model } = require("mongoose");

// CREATING THE USER SCHEMA
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// CREATING THE USER MODEL
const User = model("User", userSchema);

module.exports = User;
