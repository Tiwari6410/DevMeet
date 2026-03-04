const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");

// Define the route for sending connection requests
userRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send(" connection request sent successfully");
});

module.exports = userRouter;
