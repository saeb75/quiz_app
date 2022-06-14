const mongoose = require("mongoose");
const AnsewerOptionSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  isCorrect: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    answerOptions: {
      type: [AnsewerOptionSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 4;
        },
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1,
    },
    category: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    difficulty: {
      type: String,
      default: "easy",
      enum: ["easy", "medium", "hard"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Question", questionSchema);
const data = {
  difficulty: "easy",
  category: "general",
  correctAnswer: "a",
  question: "What is the capital of India?",
  answerOptions: [
    {
      answer: "a",
      isCorrect: true,
    },
    {
      answer: "b",
      isCorrect: false,
    },
    {
      answer: "c",
      isCorrect: false,
    },
    {
      answer: "d",
      isCorrect: false,
    },
  ],
};
