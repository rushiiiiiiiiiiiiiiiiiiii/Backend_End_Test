const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default:null,
    },
    location: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    ownerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'owner',
      required:true,
    },
    amenities: [
      {type: String},
    ]
  },
  { timestamps: true }
);

const Property = mongoose.model('property', PropertySchema);
module.exports = Property;
