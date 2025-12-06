const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", BookingSchema);
module.exports = Booking;
