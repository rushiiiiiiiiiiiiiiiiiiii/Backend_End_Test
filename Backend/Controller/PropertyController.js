const mongoose = require("mongoose");
const Property = require("../Schemas/Property");
const bcrypt = require("bcrypt");

exports.Createproperty = async (req, res) => {
  try {
    const { title, location, pricePerNight, ownerId, amenities } = req.body;
    console.log(title, location, pricePerNight, ownerId, amenities);

    if (!title || !location || !pricePerNight || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const property = await Property.create({
      title,
      location,
      pricePerNight,
      ownerId,
      amenities: amenities || [],
    });

    res.status(201).json({
      success: true,
      message: "Property Created Successfully",
      property,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed To Create property",
      error: err.message,
    });
  }
};
