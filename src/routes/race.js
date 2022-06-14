// const errorMapper = require("../middelwares/errorMapper");
// const {
//   createQuestionValidation,
// } = require("../validations/questionValidation");

const { RaceController } = require("../controllers/race");

const router = require("express").Router();

router.post("/create", RaceController.create);

module.exports = {
  raceRouter: router,
};
