const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Race = require("../models/Race");

class RaceController {
  async create(req, res, next) {
    try {
      const { _id } = req.user;
      const { quizId } = req.body;
      const question = await Question.aggregate([{ $sample: { size: 2 } }]);
      const quiz = await Quiz.findById(quizId);
      if (question.length === 0) {
        throw { status: 404, message: "No question found" };
      }

      const questionIds = question.map((question) => question._id);
      let raceObj = {
        quiz: quizId,
        questions: questionIds,
        players: quiz.players.map((item) => {
          return {
            player: item._id,
            result: [],
            answerd: false,
          };
        }),
        turn: _id,
      };
      const newRace = await Race.create(raceObj);
      if (!newRace) {
        throw { success: false, message: "new race not created" };
      }
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        {
          $push: {
            races: newRace._id,
          },
        },
        { new: true }
      ).populate("races");
      if (updatedQuiz) {
        res.json({
          race: newRace,
          success: true,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getExistRace(req, res, next) {
    try {
      const { _id } = req.user;
      const { quizId, raceId } = req.body;
      const race = await Race.findOne({ _id: raceId, turn: _id, quiz: quizId });
      if (!race) {
        throw {
          status: 400,
          message: "not found a race with this information",
        };
      }
      return res.json({
        success: true,
        race,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async AnswersQuestion(req, res, next) {
    try {
      const { _id } = req.user;
      const { raceId, quizId, result } = req.body;
      const quizUpdateObj = {};
      const raceUpdateObj = {
        "players.$[player].result": result,
        "players.$[player].answerd": true,
      };
      const quiz = await Quiz.findOne({ _id: quizId, races: raceId }).populate(
        "races"
      );
      const race = quiz.races.find((item) => item._id == raceId);
      if (!quiz) {
        throw { status: 404, message: "No quiz found" };
      }
      console.log(quiz);
      if (quiz.players.length === 1) {
        quizUpdateObj.RequestRival = true;
        quizUpdateObj.turn = null;
        raceUpdateObj.turn = null;
      }

      if (quiz.players.length === 2) {
        const rivalPlayer = race.players.find((item) => {
          return item.player.toString() != _id.toString();
        });

        if (rivalPlayer.answerd) {
          raceUpdateObj.status = "finished";
          raceUpdateObj.turn = null;
          quizUpdateObj.turn = _id;
        } else {
          raceUpdateObj.turn = rivalPlayer.player;
          quizUpdateObj.turn = rivalPlayer.player;
        }
      }

      const updatedRace = await Race.findOneAndUpdate(
        {
          quiz: quizId,
          _id: raceId,
        },
        {
          $set: raceUpdateObj,
        },
        { arrayFilters: [{ "player.player": _id }], new: true }
      );
      const updatedQuiz = await Quiz.findOneAndUpdate(
        {
          _id: quizId,
        },
        {
          $set: quizUpdateObj,
        },
        { new: true }
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

      if (!updatedQuiz) {
        res.status(400).json({
          success: false,
          message: "not Found a Race",
        });
      }
      res.json({
        updatedQuiz,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  RaceController: new RaceController(),
};
