const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, userName, password } = req.body;
      const hasehd_Password = bcrypt.hashSync(password, 10);
      const user = await User.create({
        name,
        email,
        userName,
        password: hasehd_Password,
      });
      res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }

    return res.json({
      success: true,
      message: "register success",
    });
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 401,
          message: "Invalid password",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({
        status: 200,
        message: "Login success",
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            userName: user.userName,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  AuthController: new AuthController(),
};
