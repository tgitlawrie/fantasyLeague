const express = require("express");

const League = require("../models/leagueschema");
const Users = require("../models/users");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { userId, leagueName, canInvite, leagueSizeLimit, leagueMode } =
    req.body;
  const newLeague = new League({
    owner: userId,
    leagueName: leagueName,
    lockedInvites: canInvite,
    members: userId,
    leagueMode: leagueMode,
    maxSize: leagueSizeLimit,
  });

  try {
    await newLeague.save();
    console.log(`saved: ${newLeague}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;