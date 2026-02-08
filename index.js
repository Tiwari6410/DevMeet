
const express = require("express");
const connectDB = require("./src/config/database");
const userSchema = require("./src/models/user");

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// get user route
app.get("/user", async(req, res)=>{
    const userEmailId = req.body.email;
   try{
    const user = await userSchema.find({email : userEmailId});
    if(user.length === 0 ){
        res.status(404).send("user not found");
    }else{
        res.status(200).send(user);
    }
   }catch(err){
    res.status(500).send("something went wrong");
   }

})

//findOne user route
app.get("/userone", async(req,res)=>{
    const userEmailId = req.body.email;
    try{
        const user = await userSchema.findOne({email : userEmailId})
        if(!user){
            res.status(404).send("user not found")

        }else{
            res.status(200).send(user)
        }
    }catch(err){
        res.status(500).send("something went wrong")
    }
})

// feed user rout 
app.get("/feed", async (req,res)=>{
    try{
        const users = await userSchema.find();
        console.log("users", users);
        if(users.length ===0 ){
            res.status(404).send("no users found")

        }else{
            res.status(200).send(users)
        }
    }catch(err){
        res.status(500).send("something went wrong")
    }
})

// Delete user route
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;
    const userData = req.body;
    console.log("userId", userId);
    try{
        const user = await userSchema.findByIdAndDelete({_id : userId},userData)
        if(!user){
            res.status(404).send("user not found")

        }else{
            res.status(200).send("user deleted successfully")
        }
    }catch(err){
        res.status(500).send("something went wrong")
    }
})

// update user using PATCH
app.patch("/user", async(req,res)=>{
    const userId = req.body.userId;
    const userData = req.body;

    console.log("userId", userId);
    try{
        const userUpdated = await userSchema.findByIdAndUpdate({_id : userId}, userData,{ returnDocument : "after"})
        if(!userUpdated){
            res.status(404).send("user not found ")
        }else{
            res.status(200).send("user updated successfully")
        }
    }catch(err){
        res.status(500).send("something went wrong")
    }
})


// signup route
app.post("/signup", async (req, res)=>{

    const user = new userSchema(req.body);
    console.log("userdetails", req.body);
 try{
    await user.save()
    res.status(201).send({message : "user signed up successfully", user});
 }catch(err){
    res.status(500).send({message : "error in signup", err} );
 }
})

connectDB().then(()=>{
    console.log("DB connected successfully");
    app.listen(7777,()=>{
        console.log("congratulation server is running on port 7777");
    })
}).catch((err)=>{
    console.log("error in DB connection", err);
});