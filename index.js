
const express = require("express");
const connectDB = require("./src/config/database");
const userSchema = require("./src/models/user");

const app = express();

app.use(express.json());

const userData = {
    firstName : "John",
    lastName : "Deo",
    age : 32,
    email: "john@example.com",
    password : "john@123"
}
app.post("/signup", async (req, res)=>{

    const user = new userSchema(userData);
    console.log("userdetails", req.body);
//  try{
//     await user.save()
//     res.status(201).send({message : "user signed up successfully", user});
//  }catch(err){
//     res.status(500).send({message : "error in signup", err} );
//  }
})

connectDB().then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
        console.log("congratulation server is running on port 7777");
    })
}).catch((err)=>{
    console.log("error in DB connection", err);
});