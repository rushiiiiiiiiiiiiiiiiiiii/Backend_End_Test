const express = require('express')
const { CreateOwner } = require('../Controller/OwnerController')

const Ownerrouter = express.Router()


Ownerrouter.post('/Createowner', CreateOwner)

module.exports = Ownerrouter