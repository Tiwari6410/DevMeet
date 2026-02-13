const express = require("express");
const connectDB = require("./src/config/database");
const userSchema = require("./src/models/user");
const { validUserSignup } = require("./src/util/validator");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// get user route
app.get("/user", async (req, res) => {
  const userEmailId = req.body.email;
  try {
    const user = await userSchema.find({ email: userEmailId });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

//findOne user route
app.get("/userone", async (req, res) => {
  const userEmailId = req.body.email;
  try {
    const user = await userSchema.findOne({ email: userEmailId });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// feed user rout
app.get("/feed", async (req, res) => {
  try {
    const users = await userSchema.find();
    console.log("users", users);
    if (users.length === 0) {
      res.status(404).send("no users found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// Delete user route
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  const userData = req.body;
  console.log("userId", userId);
  try {
    const user = await userSchema.findByIdAndDelete({ _id: userId }, userData);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send("user deleted successfully");
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// update user using PATCH
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;

  console.log("userId", userId);
  const allowedUpdates = [
    "userId",
    "password",
    "about",
    "skills",
    "photoUrl",
    "gender",
    "age",
  ];
  const isAllowerUpdate = Object.keys(userData).every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isAllowerUpdate) {
    throw new Error("this field is not allowed to update");
  }

  try {
    const userUpdated = await userSchema.findByIdAndUpdate(
      { _id: userId },
      userData,
      { returnDocument: "after", runValidators: true },
    );
    if (!userUpdated) {
      res.status(404).send("user not found ");
    } else {
      res.status(200).send("user updated successfully");
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// signup route
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid Credential");
    } else {
      res.status(200).send({ message: "User Logged in successfully", user });
    }
  } catch (err) {
    throw new Error("ERROR : " + err.message);
  }
});
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
