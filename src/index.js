// console.log("hello are you available for talk")

const express = require("express")
const app = express()



app.get("/hello",(req,res)=>{
    res.send("i am from hello routes")
})

app.get("/timba", (req,res)=>{
    res.send("i am from timba server")
})

app.use("/",(req, res)=>{
 res.send("hello i am from server")
})
app.listen(3000,()=>{
    console.log("congratulation our server hasbeen successfully started")

})