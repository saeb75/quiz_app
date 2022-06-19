const errorMapper = require("../middelwares/errorMapper");
const { checkLogin } = require("../middelwares/checkLogin");
const { RaceController } = require("../controllers/Race");
const {
  createRaceValidation,
  ansewerToQuestion,
} = require("../validations/raceValidation");

const router = require("express").Router();

router.post(
  "/create",
  checkLogin,
  createRaceValidation(),
  errorMapper,
  RaceController.create
);
router.post(
  "/answer",
  checkLogin,
  ansewerToQuestion(),
  errorMapper,
  RaceController.AnswersQuestion
);
router.post(
  "/getExistRace",
  checkLogin,

  RaceController.getExistRace
);

module.exports = {
  raceRouter: router,
};
