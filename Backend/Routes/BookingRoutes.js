const express = require('express')
const { Createbooking } = require('../Controller/BookingController')

const Bookingrouter = express.Router()


Bookingrouter.post('/Createbooking', Createbooking)

module.exports = Bookingrouter