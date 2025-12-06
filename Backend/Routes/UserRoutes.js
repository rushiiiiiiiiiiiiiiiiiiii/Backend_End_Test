const express = require('express')
const { CreateUser } = require('../Controller/UserController')

const Userrouter = express.Router()


Userrouter.post('/Createuser', CreateUser)

module.exports = Userrouter