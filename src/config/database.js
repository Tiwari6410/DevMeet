const mongoose = require("mongoose")
URL= "mongodb+srv://namastedev:Namastenodejs@namastenode.s2rbd.mongodb.net/"

 const connectDB = async()=>{
    await mongoose.connect(URL,{ dbName: 'devConnect' })
 }

 module.exports = connectDB;


