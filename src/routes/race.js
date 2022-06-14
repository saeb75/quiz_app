// const errorMapper = require("../middelwares/errorMapper");
// const {
//   createQuestionValidation,
// } = require("../validations/questionValidation");

const { RaceController } = require("../controllers/race");
const { checkLogin } = require("../middelwares/checkLogin");

const router = require("express").Router();

router.post("/create", checkLogin, RaceController.create);

module.exports = {
  raceRouter: router,
};
