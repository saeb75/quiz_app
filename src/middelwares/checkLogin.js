const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization) throw { status: 401, message: "Unauthorized" };
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token)
      throw { status: 401, message: "Unauthorized" };
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throw { status: 401, message: "Unauthorized" };
    const user = await User.findById(decoded.id);
    if (!user) throw { status: 401, message: "Unauthorized" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
