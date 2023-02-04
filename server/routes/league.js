const express = require("express");

const League = require("../models/leagueschema");
const Users = require("../models/users");

const router = express.Router();

router.post("/create", async (req, res) => {
  //TODO check userid exists first
  const { userId, leagueName, canInvite, leagueSizeLimit, leagueMode } =
    req.body;

  // check user id exists, it should at this point but it felt right
  const user = await Users.findOne({ _id: userId });
  if (!user) {
    res.send("User not found");
    return;
  }

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
    user.leagues.push(newLeague._id);
    await user.save();
    console.log(`saved: ${newLeague} : id: ${newLeague._id}`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getUserLeague", async (req, res) => {
  // get all leagues associated with user
  console.log("/league/getuserleague");
});

module.exports = router;
