const mongoose = require("mongoose");

//this schema is for settings, so far just for the scoring system
// these are the settings for the scoring system
const settingsSchema = new mongoose.Schema({
  Points: {
    gamesPlayed: { type: Number, default: 1 },
    goals: { type: Number, default: 6 },
    assists: { type: Number, default: 4 },
    ppGoals: { type: Number, default: 4 },
    ppAssists: { type: Number, default: 2 },
    shGoals: { type: Number, default: 8 },
    shAssists: { type: Number, default: 4 },
    penaltyMins: { type: Number, default: -2 },
  },
});

const settings = mongoose.model("Settings", settingsSchema);
module.exports = settings;
