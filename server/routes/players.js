const express = require("express");
const PlayerStats = require("../models/players");
const User = require("../models/users");
const router = express.Router();

router.post("/all", async (req, res) => {
  try {
    const players = await PlayerStats.find({});
    res.json({ players });
  } catch (error) {
    console.log(error);
  }
});

router.get("/team/draft", async (req, res) => {
  // get 3 random players from each position
  const C = await PlayerStats.aggregate([
    { $match: { position: "C" } },
    { $sample: { size: 3 } },
  ]);
  const LW = await PlayerStats.aggregate([
    { $match: { position: "LW" } },
    { $sample: { size: 3 } },
  ]);
  const RW = await PlayerStats.aggregate([
    { $match: { position: "RW" } },
    { $sample: { size: 3 } },
  ]);
  const LD = await PlayerStats.aggregate([
    { $match: { position: "LD" } },
    { $sample: { size: 3 } },
  ]);
  const RD = await PlayerStats.aggregate([
    { $match: { position: "RD" } },
    { $sample: { size: 3 } },
  ]);
  const G = await PlayerStats.aggregate([
    { $match: { position: "G" } },
    { $sample: { size: 3 } },
  ]);
  // console.log(res.json({ C, LW, RW, LD, G }));
  return res.json({ C, LW, RW, LD, RD, G });
});

// route to add new player to the team
router.post("/team/add", async (req, res) => {
  //need userID
  const newPlayer = await User.findById(req.body.user);
  newPlayer.team.push(req.body._id);
  await newPlayer.save();
  // console.log(req.body);
});

module.exports = router;
