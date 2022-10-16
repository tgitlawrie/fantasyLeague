const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  isTeamFull: {
    type: Boolean,
    default: false,
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerStats",
    },
  ],
  bench: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerStats",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
