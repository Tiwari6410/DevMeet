const express = require("express");
const profileRouter = express.Router();
const { userAuth, validateEditUserProfile } = require("../middleware/auth");

// Define the profile route
profileRouter.post("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditUserProfile(req)) {
      throw new Error("invalid update request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (keys) => (loggedInUser[keys] = req.body[keys]),
    );
    await loggedInUser.save();
    // res.send(
    //   `congratulations ${loggedInUser.firstName} , your profile has been updated successfully`,
    // );

    res.json({
      message: `congratulations ${loggedInUser.firstName}, your profile has been updated successfully`,
      userData: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
