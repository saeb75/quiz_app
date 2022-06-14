const mongoose = require("mongoose");
const resultOneQuestionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: boolean,
    required: true,
  },
});
const playerResultSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  result: {
    type: [resultOneQuestionSchema],
  },
});
const raceSchema = new mongoose.Schema({
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Question",
  },
  players: {
    type: [playerResultSchema],
    required: true,
    ref: "User",
  },
  turn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: 0,
  },
  stauts: {
    type: String,
    default: "pending",
    enum: ["pending", "inProgress", "finished"],
  },
});
const quizRaceSchema = new mongoose.Schema(
  {
    players: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    races: {
      type: [raceSchema],
      required: true,
    },
  },
  { timeseries }
);

const data = {
  players: ["playerId"],
  race: [
    {
      questions: [1, 2, 3],
      players: [
        {
          player: "playerOneID",
          result: [
            {
              question: "question",
              answer: true,
            },
          ],
        },
      ],
      turn: "playerOneID",
      stauts: "pending",
    },
  ],
};

module.exports = mongoose.model("QuizRace", quizRaceSchema);
