const { QuestionController } = require("../controllers/question");
const errorMapper = require("../middelwares/errorMapper");
const {
  createQuestionValidation,
} = require("../validations/questionValidation");

const router = require("express").Router();

router.post(
  "/create",
  createQuestionValidation(),
  errorMapper,
  QuestionController.create
);

module.exports = {
  questionRouter: router,
};
