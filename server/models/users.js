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
  Team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerStats",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
