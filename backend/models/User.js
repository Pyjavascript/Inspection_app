const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,   // ek hi ID baar baar use na ho
    },
    username: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      enum: ["manager", "employee"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
