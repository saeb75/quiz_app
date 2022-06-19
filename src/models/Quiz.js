const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    players: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    races: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Race",
      required: true,
    },
    turn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 0,
    },
    RequestRival: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
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

module.exports = mongoose.model("Quiz", quizSchema);
