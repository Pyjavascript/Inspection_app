const User = require("../models/User");
const { Employee, Manager } = require("../models/RoleUsers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const newUser = new User({ companyId, username, designation, password: hashedPassword });
    await newUser.save();

    // also save in role-based collection
    if (designation === "employee") {
      const emp = new Employee({ companyId, username, designation, password: hashedPassword });
      await emp.save();
    } else if (designation === "manager") {
      const mgr = new Manager({ companyId, username, designation, password: hashedPassword });
      await mgr.save();
    }

    res.status(201).json({ msg: "User registered successfully" });
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
