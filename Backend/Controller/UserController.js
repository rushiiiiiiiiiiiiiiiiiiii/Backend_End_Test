const mongoose = require("mongoose");
const User = require("../Schemas/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, "SECRET_KEY");

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed To Create User",
      error: err.message,
    });
  }
};
