# DevMeet

node js notes

+++++++++++++++++++++++++++++++

<h1 style="color:red">Advance routing technique :  </h1>

<p> localhost:3000/ab?c = abc / ac (it will work on different routs )</p>

localhost:3000/ab+c = abc / abbbc /abbbbbbbbbc (it will work on different routs )

localhost:3000/ab\*cd = abcd / abARVINDSTIOERNEREIORENRcd (it will work make sure it should start with ab and end with cd inbetween abcd you can put anything it doesn't care )

localhost:3000/a(bc)?d = abcd / ad (it will work, it is saying bc is optional )

localhost:3000/a(bc)+ d = abcd / abcbcbcd (it will work, it is saying repeatation of bc inbetween ad can work )

try this regEx as well : 
=  /a/ (means : if routes contains "a" then it will work

= "/.*fly$/ (means : if routes contains fly at the end of the word it will work that routes )

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Query params how we can send through api +++++++++++++

http://localhost:3000/user?userid=101
http://localhost:3000/user?userid=101&password="arvindpass"

so we can get it through the controller user : req.query

app.get("/user", (req,res)=>{
console.log(req.query) // it will return all value like a object
res.send("server returning the response please check")
})

+++++++++++++++++++++++++++++++++++++++++++++ DYNAMIC Routes +++++++++++++++++++++++++++++++++++++++++++++++++++

http://localhost:3000/user/101/arvind/arvind1234

app.get("/user/:userId/:name/:password",(req,res)=>{
console.log(req.params);
res.send({firstname:"Arvind", lastname : "Tiwari"})
})

// we will get an object like :{
userId : 101, name : "Arvind", password : "arvind1234"

}

    									}

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

How to create server in node js

const express = require("express");

const app = express();

app.get("user", (req, res)=>{

    res.send("route handler 2")

})

app.listen(8888, ()=>{

    console.log("server is live on the port number 8888 …")

})

++++++++++++++++++++++++ handler inside handler ===================================================================

app.get("user", (req, res, next)=>{

  console.log("this is console")
next();
res.send("route handler 1")
},
(req,res)=>{

res.send("second route handler"
});

app.listen(8888, ()=>{

  console.log("server is live on the port number 8888 …")
})

+++++++++++++++++++++++++++++++++++++++++++++++++++===================================================+++++++++

app.use("/route",rh1, rh2 , rh3, rh4)

app.use("/route", [rh1, rh2 , rh3, rh4])

app.use("/route", [rh1, rh2] , rh3, rh4)

app.use("user",(req,res)=>{
console.log("handling the route user1")
next();
},(req, res,next)=>{
console.log("handling the route user2")
next();
}, (req, res, next)=>{
console.log("handling the route user3")
}, (req, res,next)=>{
console.log("handling the route user 4")
res.send("handling response 4")
);

make sure we are not using next() in the last route handler other wise it will through an error

we need to share "res" and we need to handle gracefully.

++++++++++++++++++++++++=====================================================================================

Hw

multiple route handlers and play with the code
next
next function and errrors alogn with res.send()
app.use("user", [rh1, rh3, rh3 ])

++++++++++++++++++++++++++++++++++++++++++++++++++++============================================================

//Get / users => middleware chain => request handler.
