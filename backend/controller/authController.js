const User = require("../models/User");
const { Employee, Manager } = require("../models/RoleUsers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userRegister(req, res) {
  try {
    const { companyId, username, designation, password } = req.body;

    const UserAlready = await User.findOne({ companyId });
    if (UserAlready) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      companyId,
      username,
      designation,
      password: hashPass,
    });
    // ...existing code...
    if (designation === "employee") {
      await Employee.create({
        companyId: user.companyId,
        username: user.username,
        designation: user.designation,
        password: user.password,
        _id: user._id, // optional, to keep same id
      });
    } else if (designation === "manager") {
      await Manager.create({
        companyId: user.companyId,
        username: user.username,
        designation: user.designation,
        password: user.password,
        _id: user._id, // optional
      });
    }
    // ...existing code...

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("cookie", token);

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        username: user.username,
        designation: user.designation,
        companyId: user.companyId,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err); // <-- log error
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { companyId, password } = req.body;

    const user = await User.findOne({ companyId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // <-- add await
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("cookie", token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        designation: user.designation,
        companyId: user.companyId,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { userRegister, loginUser, getUserInfo };
