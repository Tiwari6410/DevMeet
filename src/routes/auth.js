const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const { validUserSignup } = require("../util/validator");
const { userAuth } = require("../middleware copy/auth");
const jwr = require("jsonwebtoken");

// Importing necessary modules and middleware
// Define the signup route
authRouter.post("/signup", userAuth, async (req, res) => {
  try {
    validUserSignup(req);
    const { firstName, lastName, email, age, gender, skills, about, password } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash", passwordHash);

    const user = new userSchema({
      firstName,
      lastName,
      email,
      age,
      gender,
      skills,
      about,
      password: passwordHash,
    });

    await user.save();
    res.status(201).send({ message: "user signed up successfully", user });
  } catch (err) {
    throw new Error(err.message);
  }
});

//Define the Login route
authRouter.post("/login", userAuth, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    // call the schema method we defined in src/models/user.js
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
        httpOnly: true, // Cookie is only accessible through HTTP(S) requests
      });
      res.send("Login successfully!!!!!s");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;
