const mongoose = require("mongoose")
URL= "mongodb+srv://namastedev:Namastenodejs@namastenode.s2rbd.mongodb.net/?appName=Hello"

 const connectDB = async()=>{
    await mongoose.connect(URL)
 }

 module.exports = connectDB;


