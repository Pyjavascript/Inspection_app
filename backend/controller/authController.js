const User = require("../models/User");
const { Employee, Manager } = require("../models/RoleUsers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
exports.register = async (req, res) => {
  try {
    const { companyId, username, designation, password } = req.body;

    // check if company ID already exists
    const existingUser = await User.findOne({ companyId });
    if (existingUser) {
      return res.status(400).json({ msg: "This company ID is already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save in main collection
    const newUser = await User.create({ companyId, username, designation, password: hashedPassword });

    // also save in role-based collection
    if (designation === "employee") {
      const emp = await Employee.create({ companyId, username, designation, password: hashedPassword });
    } else if (designation === "manager") {
      const mgr = await Manager.create({ companyId, username, designation, password: hashedPassword });
    }

    res.status(201).json({ msg: "User registered successfully", user: { companyId, username, designation } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { companyId, password } = req.body;

    const user = await User.findOne({ companyId });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, companyId: user.companyId, designation: user.designation },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        companyId: user.companyId,
        username: user.username,
        designation: user.designation,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
