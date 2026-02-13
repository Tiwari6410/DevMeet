const validator = require("validator");

const validUserSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("first name must be between 4 and 50 characters");
  } else if (lastName.length < 4 || lastName.lenth > 50) {
    throw new Error("Last name must be between 4 and 50 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("your password is not strong enough, try again");
  }
};

module.exports = {
  validUserSignup,
};
