const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default:null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "owner",
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model('owner', OwnerSchema);
module.exports = Owner;
