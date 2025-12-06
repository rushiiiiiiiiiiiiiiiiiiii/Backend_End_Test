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


exports.getOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const result = await Booking.aggregate([
      {
        $lookup: {
          from: "properties",
          localField: "propertyId",
          foreignField: "_id",
          as: "property"
        }
      },
      { $unwind: "$property" },

      {
        $match: {
          "property.ownerId": new mongoose.Types.ObjectId(ownerId)
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      {
        $group: {
          _id: "$propertyId",

          propertyTitle: { $first: "$property.title" },

          totalBookings: { $sum: 1 },

          totalRevenue: { $sum: "$totalPrice" },

          customers: { $addToSet: "$user.name" }
        }
      },

      {
        $sort: {
          totalRevenue: -1
        }
      }
    ]);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Aggregation failed",
      error: err.message
    });
  }
};
