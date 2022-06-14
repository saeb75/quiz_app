const { AuthController } = require("../controllers/auth");
const errorMapper = require("../middelwares/errorMapper");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

const Router = require("express").Router;

const router = Router();

router.post(
  "/register",
  registerValidation(),
  errorMapper,
  AuthController.register
);
router.post("/login", loginValidation(), errorMapper, AuthController.login);

module.exports = { authRouter: router };
