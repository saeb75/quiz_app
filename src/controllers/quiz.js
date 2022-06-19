const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Race = require("../models/Race");
// const data = {
//   players: ["playerId"],
//   race: [
//     {
//       questions: [1, 2, 3],
//       players: [
//         {
//           player: "playerOneID",
//           result: [
//             {
//               question: "question",
//               answer: true,
//             },
//           ],
//         },
//       ],
//       turn: "playerOneID",
//       stauts: "pending",
//     },
//   ],
// };
class QuizController {
  async checkQuizWithRequestRival(req, res, next) {
    try {
      const findedQuiz = await Quiz.find({
        RequestRival: true,
      });
      if (findedQuiz.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Not Found quiz with RequestRival",
        });
      }
      return res.json({
        success: true,
        quiz: findedQuiz,
        message: "Quiz Found",
      });
    } catch (error) {
      next(error);
    }
  }
  async becomePlayerOfExistsQuiz(req, res, next) {
    try {
      const { quizId } = req.body;
      const player = req.user;
      const quiz = await Quiz.findById(quizId);
      if (quiz.players.length !== 1) {
        if (!quiz) {
          throw { status: 404, message: "No quiz found" };
        }
        return res.status(400).json({
          success: false,
          message: "Quiz two player already",
        });
      }
      if (quiz.races.length !== 1) {
        return res.status(400).json({
          success: false,
          message: "must races length be 1",
        });
      }
      if (quiz.players[0]._id.toString() === player._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "You are already player of this quiz",
        });
      }
      const raceId = quiz.races[0];
      const quizUpdateObj = {
        $push: {
          players: player._id,
        },

        $set: { turn: player._id, RequestRival: false },
      };

      const raceUpdateObj = {
        $push: {
          players: { player: player._id, result: [], answerd: false },
        },
        $set: {
          turn: player._id,
        },
      };

      const updatedRace = await Race.findByIdAndUpdate(raceId, raceUpdateObj, {
        new: true,
      });
      if (!updatedRace) {
        return res.status(400).json({
          success: false,
          message: "Race dont updated",
        });
      }
      const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizUpdateObj, {
        new: true,
      }).populate("races");

      if (updatedQuiz) {
        res.json({
          updatedQuiz,
          success: true,
          updatedQuiz,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const player = req.user;
      let quizObj = {};

      quizObj = {
        players: [player._id],
        races: [],
        turn: player._id,
      };
      const NewQuiz = await Quiz.create(quizObj);
      if (!NewQuiz)
        return res.status(400).json({
          succes: false,
          message: "New Race Dosnt Create",
        });
      const createdQuiz = await Quiz.findById(NewQuiz._id).populate("players");
      // const createdQuiz = await Quiz.findById(NewQuiz._id).populate([
      //   {
      //     path: "players",
      //   },
      //   {
      //     path: "races",
      //     populate: [
      //       {
      //         path: "questions",
      //         model: "Question",
      //       },
      //       {
      //         path: "players.player",
      //         model: "User",
      //         select: "name",
      //       },
      //     ],
      //   },
      // ]);
      res.json({ quiz: createdQuiz, success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  QuizController: new QuizController(),
};
