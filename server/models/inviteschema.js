const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema(
  {
    leagueId: {
      type: mongoose.Types.ObjectId,
      ref: "League",
      required: true,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    recipientEmail: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      expires: 432000, // expires in 5 days
    },
  },
  { timestamps: true }
);

const Invites = mongoose.model("Invite", inviteSchema);
module.exports = Invites;
