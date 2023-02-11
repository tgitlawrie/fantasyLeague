const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    teamname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    prevweek: {
      type: Number,
      default: 0,
    },
    weeklyscore: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerStats",
      },
    ],
    logo: {
      type: String,
    },
    leagues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "League",
      },
    ],
    bench: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerStats",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
