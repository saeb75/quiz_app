const Question = require("../models/Question");
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
class RaceController {
  async AnswersQuestion(req, res, next) {
    try {
      const { _id } = req.user;
      const { raceId, quizId, result } = req.body;
      console.log(result);
      console.log(_id);
      console.log(result);
      const race = await Race.findOneAndUpdate(
        {
          _id: quizId,

          "races._id": raceId,
        },
        {
          $set: {
            "races.$.players.$[player].result": result,
          },
        },
        { arrayFilters: [{ "player.player": _id }] }
      );
      // const race = await Race.findOne(
      //   {
      //     _id: quizId,

      //     "races._id": raceId,
      //     "races.players.player": _id,
      //   },
      //   {
      //     "races.players.$$.result": 1,
      //   }
      // );
      console.log(race);
      if (!race) {
        res.status(400).json({
          success: false,
          message: "not Found a Race",
        });
      }
      res.json({
        race,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const player = req.user;
      let raceObj = {};
      const question = await Question.aggregate([{ $sample: { size: 2 } }]);
      if (question.length === 0) {
        throw { status: 404, message: "No question found" };
      }
      const questionIds = question.map((question) => question._id);
      raceObj = {
        players: [player._id],
        races: [
          {
            questions: questionIds,
            players: [
              {
                player: player._id,
              },
            ],
            turn: player._id,
            status: "pending",
          },
        ],
      };
      const newRace = await Race.create(raceObj);
      if (!newRace)
        return res.status(400).json({
          succes: false,
          message: "New Race Dosnt Create",
        });
      const createdRace = await Race.findById(newRace._id).populate([
        {
          path: "players",
        },
        {
          path: "races",
          populate: [
            {
              path: "questions",
              model: "Question",
            },
            {
              path: "players.player",
              model: "User",
              select: "name",
            },
          ],
        },
      ]);
      res.json({ race: createdRace.races[0], success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  RaceController: new RaceController(),
};
