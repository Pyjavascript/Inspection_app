const mongoose = require("mongoose");
const userSchema = require("./User").schema;

// Employees collection
const Employee = mongoose.model("Employee", userSchema, "employees");

// Managers collection
const Manager = mongoose.model("Manager", userSchema, "managers");

module.exports = { Employee, Manager };
