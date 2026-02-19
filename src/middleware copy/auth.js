const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedObj = await jwt.verify(token, "DevMeet$8970");

    const { _id } = decodedObj;
    const user = await userSchema.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
};
module.exports = {
  userAuth,
};
