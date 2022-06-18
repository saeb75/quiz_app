const errorMapper = require("../middelwares/errorMapper");
// const {
//   createQuestionValidation,
// } = require("../validations/questionValidation");

const { RaceController } = require("../controllers/race");
const { checkLogin } = require("../middelwares/checkLogin");
const { ansewerToQuestion } = require("../validations/raceValidation");

const router = require("express").Router();

router.post(
  "/answer",
  checkLogin,
  ansewerToQuestion(),
  errorMapper,
  RaceController.AnswersQuestion
);
router.post("/create", checkLogin, RaceController.create);

module.exports = {
  raceRouter: router,
};
