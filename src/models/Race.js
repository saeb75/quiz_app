const { default: mongoose } = require("mongoose");

const resultOneQuestionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: Boolean,
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
  answerd: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const raceSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
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
  status: {
    type: String,
    default: "inProgress",
    enum: ["inProgress", "finished"],
  },
});

module.exports = mongoose.model("Race", raceSchema);
