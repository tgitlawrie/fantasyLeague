const mongoose = require("mongoose");

const goalieSchema = new mongoose.Schema({
  number: Number,
  firstName: String,
  lastName: String,
  team: String,
  gamesPlayed: Number,
  minutes: Number,
  wins: Number,
  losses: Number,
  sol: Number,
  sog: Number,
  goalsAgainst: Number,
  goalsAgainstAvg: Number,
  savePct: Number,
  shutouts: Number,
  position: {
    type: String,
    default: "G",
  },
  score: {
    type: Number,
    default: 0,
  },
});

const GoalieStats = mongoose.model("Goaliestat", goalieSchema);
module.exports = GoalieStats;
