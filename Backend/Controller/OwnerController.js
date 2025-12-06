const mongoose = require("mongoose");
const Owner = require("../Schemas/Owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateOwner = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { ownerId: owner._id, role: owner.role },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Owner Created Successfully",
      owner,
      token,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed To Create Owner",
      error: err.message,
    });
  }
};
