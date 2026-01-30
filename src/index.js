const express = require("express")
const app = express();


//middleware 
app.use("/", (req, res, next)=>{
    next()
})

app.get("/user", (req, res, next)=>{
    console.log("i am from 1st request hander")                      //middleware
    next();
}, (req, res, next)=>{                                              //middleware 
    console.log("i am from second request handler ")
    next()
}, (req, res, next)=>{
    res.send("this is the final response of the request handler ") //request handler 
    next()
})

app.listen("7777", ()=>{
    console.log("program is suppose to done and finish this is the last") 
})





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



