const { body } = require("express-validator");
const User = require("../models/User");
const registerValidation = () => {
  return [
    body("name", "Name is required").not().isEmpty(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .custom((value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      })
      .withMessage("Email is invalid")
      .custom((value) => {
        return User.findOne({ email: value })
          .then((user) => {
            if (user) {
              throw "Email already exists";
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .withMessage("Email already exists"),
    body("userName")
      .notEmpty()
      .withMessage("UserName is required")
      .custom((value) => {
        return User.findOne({ userName: value })
          .then((user) => {
            if (user) {
              throw "UserName already exists";
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .withMessage("UserName already exists"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .custom((value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      })
      .withMessage(
        "Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character"
      ),
  ];
};
const loginValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .custom((value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      })
      .withMessage("Email is invalid"),

    body("password").notEmpty().withMessage("Password is required"),
  ];
};

module.exports = {
  registerValidation,
  loginValidation,
};
