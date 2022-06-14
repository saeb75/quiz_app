const { body } = require("express-validator");

const createQuestionValidation = () => {
  return [
    body("question")
      .notEmpty()
      .withMessage("Question is required")
      .isLength({ min: 5, max: 255 })
      .withMessage("Question must be between 5 and 255 characters"),
    body("answerOptions")
      .notEmpty()
      .withMessage("Answer options are required")
      .isArray()
      .withMessage("Answer options must be an array")
      .custom((value) => {
        return value.length === 4;
      })
      .withMessage("Answer options must be 4")
      .custom((value) => {
        return value.every((option) => {
          return option.answer.length > 0 && option.answer.length < 255;
        });
      })
      .withMessage("Answer options must be between 1 and 255 characters")
      .custom((value) => {
        const correctAnswer = value.filter((option) => {
          return option.isCorrect === true;
        });
        return correctAnswer.length === 1 ? true : false;
      })
      .withMessage("Answer options must have a correct answer"),

    body("correctAnswer")
      .notEmpty()
      .withMessage("Correct answer is required")
      .isLength({ min: 1, max: 1 })
      .withMessage("Correct answer must be 1 character"),
    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .isLength({ min: 1, max: 255 })
      .withMessage("Category must be between 1 and 255 characters"),
  ];
};

module.exports = {
  createQuestionValidation,
};
