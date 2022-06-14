const { authRouter } = require("./auth");
const { questionRouter } = require("./question");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/question", questionRouter);

module.exports = { allRouter: router };
