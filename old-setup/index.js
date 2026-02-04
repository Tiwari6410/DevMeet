
const express = require("express")
const app = express()


//handling error by using try catch
app.use("/",(req,res)=>{
    try{
        res.send("alll user data is collected by them ")
    }catch(err){
        res.status(401).send("Something went wrong please check")
    }
})

//handling error by using given argument of request err 
// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Please Check somethng went wrong")
//     }
//     res.send("all user are providing data with own no need to worry for now ")
// })

app.listen(7777, ()=>{
    console.log("Congratulation Guys we are doing very good Server is running properly")
})












// const express = require("express")
// const {adminAuth, userAuth} = require("./middleware/auth")
// const app = express()

// app.use("/admin",adminAuth)

// app.get("/user",userAuth,(req, res)=>{
//     res.send("Collection of userdata is collected")
// })

// app.get("/admin/getUserData", (req,res)=>{

//     res.send("All user data collected")
// })

// app.get("/admin/deletedUser", (req,res)=>{
//     res.send("UserData deleted")
// })

// app.listen(7777,()=>{
//     console.log("successfully server is running ")
// })

















// const express = require("express")
// const app = express();


// //middleware 
// app.use("/", (req, res, next)=>{
//     next()
// })

// app.get("/user", (req, res, next)=>{
//     console.log("i am from 1st request hander")                      //middleware
//     next();
// }, (req, res, next)=>{                                              //middleware 
//     console.log("i am from second request handler ")
//     next()
// }, (req, res, next)=>{
//     res.send("this is the final response of the request handler ") //request handler 
//     next()
// })

// app.listen("7777", ()=>{
//     console.log("program is suppose to done and finish this is the last") 
// })





// // console.log("hello are you available for talk")

// const express = require("express")
// const app = express()



// app.get("/hello",(req,res)=>{
//     res.send("i am from hello routes")
// })

// app.get("/timba", (req,res)=>{
//     res.send("i am from timba server")
// })

// app.use("/",(req, res)=>{
//  res.send("hello i am from server")
// })
// app.listen(3000,()=>{
//     console.log("congratulation our server hasbeen successfully started")

// })



