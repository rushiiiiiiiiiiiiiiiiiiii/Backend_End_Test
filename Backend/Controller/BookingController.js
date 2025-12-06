const mongoose = require("mongoose");
const Booking = require("../Schemas/Booking");
const bcrypt = require("bcrypt");

exports.Createbooking = async (req, res) => {
  try {
    const { propertyId, userId, startDate, endDate, totalPrice, status } = req.body;

    if (!propertyId || !userId || !startDate || !endDate || !totalPrice || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const existingBooking = await Booking.findOne({
      propertyId: propertyId,
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This property is already booked for these datessss",
      });
    }

    const booking = await Booking.create({
      propertyId,
      userId,
      startDate,
      endDate,
      totalPrice,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed To Book property",
      error: err.message,
    });
  }
};
