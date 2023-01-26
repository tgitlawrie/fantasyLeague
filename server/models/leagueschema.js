const mongoose = require("mongoose");

const leagueSchema = mongoose.Schema(
  //league name
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    leagueName: {
      type: String,
      unique: true,
    },
    lockedInvites: {
      type: Boolean,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    gameType: {
      type: String,
      default: "hockey",
    },
    leagueMode: {
      type: String,
      enum: ["h2h", "redraft", "rotisserie", "points"],
      required: true,
    },
    maxSize: {
      type: Number,
      required: true,
      default: 900,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);
module.exports = League;
