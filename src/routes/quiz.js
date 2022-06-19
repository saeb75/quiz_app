const errorMapper = require("../middelwares/errorMapper");
// const {
//   createQuestionValidation,
// } = require("../validations/questionValidation");

const { checkLogin } = require("../middelwares/checkLogin");

const { QuizController } = require("../controllers/quiz");

const router = require("express").Router();

router.post("/create", checkLogin, QuizController.create);
router.post(
  "/becomePlayerOfExistQuiz",
  checkLogin,
  QuizController.becomePlayerOfExistsQuiz
);
router.get(
  "/requst-rival",
  checkLogin,
  QuizController.checkQuizWithRequestRival
);

module.exports = {
  quizRouter: router,
};
