const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/database");
const userSchema = require("./src/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./src/middleware copy/auth");

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());
const signupRoute = require("./src/routes/auth");
const profileRoute = require("./src/routes/profile");
const userRoute = require("./src/routes/user");

app.use("/", signupRoute);
app.use("/", profileRoute);
app.use("/", userRoute);

// signup route
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
//     const isPasswordValid = await user.validatePassword(password);
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
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(7777, () => {
      console.log("congratulation server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("error in DB connection", err);
  });
