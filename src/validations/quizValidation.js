const { body } = require("express-validator");
const Quiz = require("../models/Quiz");

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
        const quiz = await Quiz.findOne(
          {
            _id: quizId,
            $and: [
              {
                races: {
                  $elemMatch: { _id: raceId },
                },
              },
              { "races.questions": { $all: questionCondition } },
              { races: { $elemMatch: { turn: _id } } },
              { races: { $elemMatch: { stauts: "pending" } } },
              { "races.players": { $elemMatch: { player: _id } } },
            ],
          },
          { "races.$": 1 }
        );
        console.log(quiz);
        if (!quiz) {
          throw { status: 404, message: "No question founds" };
        }
      }),
  ];
};

module.exports = { ansewerToQuestion };
