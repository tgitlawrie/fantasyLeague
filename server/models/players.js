const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  number: Number,
  firstName: String,
  lastName: String,
  team: String,
  gamesPlayed: Number,
  goals: Number,
  assists: Number,
  points: Number,
  ppGoals: Number,
  ppAssists: Number,
  shGoals: Number,
  shAssists: Number,
  penaltyMins: Number,
  avgPoints: Number,
});

// creates collection, arg1 is name of collection, will pluralise, 2nd arg schema
const PlayerStats = mongoose.model("Playerstat", playerSchema);
module.exports = PlayerStats;
