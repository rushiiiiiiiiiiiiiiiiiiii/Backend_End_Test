const express = require('express')
const { Createproperty } = require('../Controller/PropertyController')

const Propertyrouter = express.Router()


Propertyrouter.post('/Createproperty', Createproperty)

module.exports = Propertyrouter