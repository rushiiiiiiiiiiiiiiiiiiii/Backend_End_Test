const mongoose = require('mongoose')

const Conn = mongoose.connect('mongodb://localhost:27017/Airbnb')
.then(()=>{
  console.log("Mognodb Connected Successfully")
})
.catch((err)=>{
  console.log(err)
})
module.exports = Conn