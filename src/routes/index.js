const { authRouter } = require("./auth");
const { questionRouter } = require("./question");
const { quizRouter } = require("./quiz");
const { raceRouter } = require("./race");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/question", questionRouter);
router.use("/quiz", quizRouter);
router.use("/race", raceRouter);

module.exports = { allRouter: router };
