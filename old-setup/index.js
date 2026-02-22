const express = require("express");
const app = express();

//handling error by using try catch
app.use("/", (req, res) => {
  try {
    res.send("alll user data is collected by them ");
  } catch (err) {
    res.status(401).send("Something went wrong please check");
  }
});

//handling error by using given argument of request err
// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Please Check somethng went wrong")
//     }
//     res.send("all user are providing data with own no need to worry for now ")
// })

app.listen(7777, () => {
  console.log(
    "Congratulation Guys we are doing very good Server is running properly",
  );
});

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

// ????????????????????????????????????????????????????????????????????????????????????????????????????????????
//remaining code is in the old setup folder index.js file
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const connectDB = require("./src/config/database");
// const userSchema = require("./src/models/user");
// const { validUserSignup } = require("./src/util/validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { userAuth } = require("./src/middleware copy/auth");

// const app = express();

// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(cookieParser());

// // get user route
// app.get("/user", async (req, res) => {
//   const userEmailId = req.body.email;
//   try {
//     const user = await userSchema.find({ email: userEmailId });
//     if (user.length === 0) {
//       res.status(404).send("user not found");
//     } else {
//       res.status(200).send(user);
//     }
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// //findOne user route
// app.get("/userone", async (req, res) => {
//   const userEmailId = req.body.email;
//   try {
//     const user = await userSchema.findOne({ email: userEmailId });
//     if (!user) {
//       res.status(404).send("user not found");
//     } else {
//       res.status(200).send(user);
//     }
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// // feed user rout
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await userSchema.find();
//     console.log("users", users);
//     if (users.length === 0) {
//       res.status(404).send("no users found");
//     } else {
//       res.status(200).send(users);
//     }
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// // Delete user route
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const userData = req.body;
//   console.log("userId", userId);
//   try {
//     const user = await userSchema.findByIdAndDelete({ _id: userId }, userData);
//     if (!user) {
//       res.status(404).send("user not found");
//     } else {
//       res.status(200).send("user deleted successfully");
//     }
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// // update user using PATCH
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const userData = req.body;

//   console.log("userId", userId);
//   const allowedUpdates = [
//     "userId",
//     "password",
//     "about",
//     "skills",
//     "photoUrl",
//     "gender",
//     "age",
//   ];
//   const isAllowerUpdate = Object.keys(userData).every((update) =>
//     allowedUpdates.includes(update),
//   );
//   if (!isAllowerUpdate) {
//     throw new Error("this field is not allowed to update");
//   }

//   try {
//     const userUpdated = await userSchema.findByIdAndUpdate(
//       { _id: userId },
//       userData,
//       { returnDocument: "after", runValidators: true },
//     );
//     if (!userUpdated) {
//       res.status(404).send("user not found ");
//     } else {
//       res.status(200).send("user updated successfully");
//     }
//   } catch (err) {
//     res.status(500).send("something went wrong");
//   }
// });

// // signup route
// app.post("/signup", async (req, res) => {
//   try {
//     validUserSignup(req);
//     const { firstName, lastName, email, age, gender, skills, about, password } =
//       req.body;

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log("passwordHash", passwordHash);

//     const user = new userSchema({
//       firstName,
//       lastName,
//       email,
//       age,
//       gender,
//       skills,
//       about,
//       password: passwordHash,
//     });

//     await user.save();
//     res.status(201).send({ message: "user signed up successfully", user });
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await userSchema.findOne({ email: email });
//     if (!user) {
//       throw new Error("user not found");
//     }
//     const isPasswordValid = await user.validatePafssword(password);
//     if (isPasswordValid) {
//       const token = await user.getJWT();
//       res.cookie("token", token, {
//         expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
//         httpOnly: true, // Cookie is only accessible through HTTP(S) requests
//       });
//       res.send("Login successfully!!!!!s");
//     } else {
//       throw new Error("Invalid Credentials");
//     }
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

// app.post("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

// app.post("/sendConnectionRequest", userAuth, async (req, res) => {
//   res.send(" connection request sent successfully");
// });
// connectDB()
//   .then(() => {
//     console.log("DB connected successfully");
//     app.listen(7777, () => {
//       console.log("congratulation server is running on port 7777");
//     });
//   })
//   .catch((err) => {
//     console.log("error in DB connection", err);
//   });
