const { body } = require("express-validator");
const Quiz = require("../models/Quiz");
const Race = require("../models/Race");
const ansewerToQuestion = () => {
  return [
    body("quizId").notEmpty().withMessage("quizId is required"),
    body("raceId").notEmpty().withMessage("quizId is required"),
    body("result")
      .isArray()
      .withMessage("answers must be an array")
      .custom(async (value, { req }) => {
        const { raceId, quizId } = req.body;
        const { _id } = req.user;
        const questionCondition = value.map((item) => item.question);
        const race = await Race.findOne({
          $and: [
            { quiz: quizId },
            {
              _id: raceId,
            },
            { questions: { $all: questionCondition } },
            { turn: _id },
            { status: "inProgress" },
          ],
        });

        if (!race) {
          throw { status: 404, message: "No race founds" };
        }
      }),
  ];
};
const createRaceValidation = () => {
  return [
    body("quizId")
      .isMongoId()
      .withMessage("quizId is required")
      .notEmpty()
      .withMessage("quizId is required")
      .custom(async (value, { req }) => {
        const { _id } = req.user;
        const { quizId } = req.body;
        const quiz = await Quiz.findOne({ _id: quizId, turn: _id }).populate(
          "races"
        );
        if (!quiz) {
          throw {
            status: 400,
            message: "this is a problem",
          };
        }

        const inProgressRace = quiz.races.find(
          (item) => item.status == "inProgress"
        );

        if (inProgressRace) {
          throw {
            status: 400,
            message: "There is inProgress race and cant Create a new race",
          };
        }
        if (!quiz) {
          throw { status: 404, message: "No quiz founds" };
        }
      }),
  ];
};

module.exports = {
  createRaceValidation,
  ansewerToQuestion,
};
