import mongoose from "mongoose";

const goalieSchema = new mongoose.Schema({
  number: Number,
  firstName: String,
  lastName: String,
  team: String,
  gamesPlayed: Number,
  wins: Number,
  losses: Number,
  sol: Number,
  sog: Number,
  goalsAgainst: Number,
  goalsAgainstAvg: Number,
  savePct: Number,
  shutouts: Number,
});

const GoalieStats = mongoose.model("Goaliestat", goalieSchema);
module.exports = GoalieStats;
