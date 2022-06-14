const { validationResult } = require("express-validator");

module.exports = errorMapper = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: "validation error",
      errors: errors.array(),
    });
  }
  next();
};
