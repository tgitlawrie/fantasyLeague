// admin routes
const express = require("express");
const Settings = require("../models/settingsschema");
const PlayerStats = require("../models/players");
const GoalieStats = require("../models/goalieschema");

const router = express.Router();

//TODO auth for all these routes

//routes go here
router.get("/points", async (req, res) => {
  const points = await Settings.findOne({ name: "Points" });
  res.send(points);
});

router.post("/points", async (req, res) => {
  try {
    await Settings.updateOne(
      { _id: req.body.id },
      { $set: { value: req.body.settings } }
    );
    res.send("successfully updated settings");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
  // await Settings.updateOne({_id:})
});

//update the points in the players table
router.get("/points/update", async (req, res) => {
  const limit = 10;
  let updatedDocuments = 0;
  const totalPlayers = await PlayerStats.countDocuments();
  const totalGoalies = await GoalieStats.countDocuments();

  //get points values
  const { value: points } = await Settings.findOne({ name: "Points" });

  while (updatedDocuments < totalPlayers) {
    updatedDocuments += limit;
    // get players, 10 at a time and update
    const players = await PlayerStats.find()
      .skip(updatedDocuments - limit)
      .limit(limit);
    //update the players score

    Promise.all(
      players.map(async (player) => {
        const playerStats = await getPlayerStats(player._id);
        await PlayerStats.findOneAndUpdate(
          { _id: player._id },
          { $set: { score: calculateScore(playerStats, points) } },
          { upsert: true, new: true }
        ).catch((err) => console.log(err));
      })
    );
  }
  //TODO make this res.send for message return
  console.log("Players updated");

  const goalies = await GoalieStats.find();
  // .skip(updatedDocuments - limit)
  // .limit(limit);
  //update the players score
  Promise.all(
    goalies.map(async (goalie) => {
      const goalieStats = await getGoalieStats(goalie._id);
      await GoalieStats.findOneAndUpdate(
        { _id: goalie._id },
        { $set: { score: calculateScore(goalieStats, points) } },
        { upsert: true, new: true }
      ).catch((err) => console.log(err));
    })
  );

  console.log("Goalies updated");
});

const getPlayerStats = async (playerId) => {
  // get the indvidual player stats
  const stats = await PlayerStats.findOne({ _id: playerId });
  return stats;
};

const getGoalieStats = async (goalieId) => {
  const stats = await GoalieStats.findOne({ _id: goalieId });
  return stats;
};

const calculateScore = (playerStats, points) => {
  //calculate the score
  let score = 0;
  if (playerStats.position !== "G") {
    console.log("player");
    score += playerStats.gamesPlayed * points.gamesPlayed;
    score += playerStats.goals * points.goals;
    score += playerStats.assists * points.assists;
    score += playerStats.ppGoals * points.ppGoals;
    score += playerStats.ppAssists * points.ppAssists;
    score += playerStats.shGoals * points.shGoals;
    score += playerStats.shAssists * points.shAssists;
    score += playerStats.penaltyMins * points.penaltyMins;
  } else if (playerStats.position === "G") {
    //goalie stats go here
    //   wins: 2,
    // losses: 0,
    // shutouts: 10,
    // savePct: 10,
    score += playerStats.gamesPlayed * points.gamesPlayed;
    score += playerStats.wins * points.wins;
    score += playerStats.losses * points.losses;
    score += playerStats.shutouts * points.shutouts;
    score += Math.round(playerStats.savePct * points.savePct); // round up
  }
  return score;
};

module.exports = router;
