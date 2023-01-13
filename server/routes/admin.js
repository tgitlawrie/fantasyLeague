// admin routes
const express = require("express");
const Settings = require("../models/settingsschema");
const PlayerStats = require("../models/players");

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
  console.log("All documents have been updated.");
});

const getPlayerStats = async (playerId) => {
  // get the indvidual player stats
  const stats = await PlayerStats.findOne({ _id: playerId });
  return stats;
};

const calculateScore = (playerStats, points) => {
  //calculate the score
  /*player object:
  {
  _id: new ObjectId("6379d88e2ec6881efef4d4db"),
  number: 95,
  firstName: 'Ej',
  lastName: 'Skeggs',
  team: 'BEASTS',
  position: 'LD',
  gamesPlayed: 16,
  goals: 1,
  assists: 1,
  points: 2,
  ppGoals: 0,
  ppAssists: 0,
  shGoals: 0,
  shAssists: 0,
  penaltyMins: 8,
  avgPoints: 0,
  __v: 0,
  score: 12
}*/

  /*Points object
  {
  gamesPlayed: 1,
  goals: 4,
  assists: 2,
  ppGoals: 5,
  ppAssists: 3,
  shGoals: 5,
  shAssists: 3,
  penaltyMins: -2
}

*/

  let score = 0;
  if (playerStats.position !== "G") {
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
  }
  return score;
};

module.exports = router;
