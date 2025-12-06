const express = require('express')
const app = express()
const Conn = require('./conn')
app.use(express.json());
const User = require('./Schemas/User')
app.get('/', (req,res)=>{
  res.send("hii rushikesh")
})
const UserRouter = require('./Routes/UserRoutes')
const OwnerRouter = require('./Routes/OwnerRoutes');
const Propertyrouter = require('./Routes/PropertyRoutes');
const Bookingrouter = require('./Routes/BookingRoutes');
app.use('/user', UserRouter)
app.use('/owner', OwnerRouter)
app.use('/property', Propertyrouter)
app.use('/booking', Bookingrouter)

app.listen(8000, ()=>{
  console.log("Server running on PORT 8000")
})