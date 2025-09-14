const User = require("../models/User");
const { Employee, Manager } = require("../models/RoleUsers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//     const { companyId, username, designation, password } = req.body;

//     // check if company ID already exists
//     const existingUser = await User.findOne({ companyId });
//     if (existingUser) {
//       return res.status(400).json({ msg: "This company ID is already registered" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // save in main collection
//     const newUser = await User.create({ companyId, username, designation, password: hashedPassword });

//     // also save in role-based collection
//     if (designation === "employee") {
//       const emp = await Employee.create({ companyId, username, designation, password: hashedPassword });
//     } else if (designation === "manager") {
//       const mgr = await Manager.create({ companyId, username, designation, password: hashedPassword });
//     }

//     res.status(201).json({ msg: "User registered successfully", user: { companyId, username, designation } });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { companyId, password } = req.body;

//     const user = await User.findOne({ companyId });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     console.log("Using secret in login:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing");

//     const token = jwt.sign(
//       { id: user._id, companyId: user.companyId, designation: user.designation },
//       secret,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       msg: "Login successful",
//       token,
//       user: {
//         companyId: user.companyId,
//         username: user.username,
//         designation: user.designation,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };

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
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { userRegister, loginUser };