# DevMeet

node js notes

+++++++++++++++++++++++++++++++

<h1 style="color:red">Advance routing technique :  </h1>

<p> localhost:3000/ab?c = abc / ac (it will work on different routs )</p>

localhost:3000/ab+c = abc / abbbc /abbbbbbbbbc (it will work on different routs )

localhost:3000/ab\*cd = abcd / abARVINDSTIOERNEREIORENRcd (it will work make sure it should start with ab and end with cd inbetween abcd you can put anything it doesn't care )

localhost:3000/a(bc)?d = abcd / ad (it will work, it is saying bc is optional )

localhost:3000/a(bc)+ d = abcd / abcbcbcd (it will work, it is saying repeatation of bc inbetween ad can work )

try this regEx as well : /a/ (means : if routes contains a then it will work

    		: "/.*fly$/ (means : if routes contains fly at the end of the word it will work that routes )

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Query params (how we can send through api +++++++++++++

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
