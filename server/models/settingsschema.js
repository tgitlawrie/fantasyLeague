const mongoose = require("mongoose");

//this schema is for settings, so far just for the scoring system
// these are the settings for the scoring system
const settingsSchema = new mongoose.Schema({
  name: { type: String, default: "Points" },
  value: {
    type: Object,
    default: {
      gamesPlayed: 1,
      goals: 6,
      assists: 4,
      ppGoals: 4,
      ppAssists: 2,
      shGoals: 8,
      shAssists: 4,
      penaltyMins: -2,
    },
  },
  description: {
    type: String,
    default: "Settings for scoring system",
  },
});

const settings = mongoose.model("Settings", settingsSchema);
module.exports = settings;
