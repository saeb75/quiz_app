const Question = require("../models/Question");

class QuestionController {
  async create(req, res, next) {
    try {
      const { question, answerOptions, correctAnswer, category, difficulty } =
        req.body;

      const newQuestion = await Question.create({
        question,
        answerOptions,
        correctAnswer,
        category,
        difficulty,
      });
      if (!newQuestion) {
        return res.status(400).json({
          message: "Question could not be created",
        });
      }
      res.status(201).json({
        message: "Question created successfully",
        data: newQuestion,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  QuestionController: new QuestionController(),
};
