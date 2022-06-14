const { authRouter } = require("./auth");
const { questionRouter } = require("./question");
const { raceRouter } = require("./race");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/question", questionRouter);
router.use("/race", raceRouter);

module.exports = { allRouter: router };
