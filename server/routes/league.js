const express = require("express");

const League = require("../models/leagueschema");
const Users = require("../models/users");

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log("/create");
  //TODO check userid exists first
  const {
    userId,
    leagueName,
    canInvite,
    leagueSizeLimit,
    leagueMode,
    isPublic,
  } = req.body;

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
    isPublic: isPublic,
  });

  // check if league with the same name exists
  const existingLeague = await League.findOne({
    leagueName: newLeague.leagueName,
  });
  if (existingLeague) {
    console.log("league exists");
    res.send("League with the same name already exists");
    return;
  }

  try {
    await newLeague.save();
    user.leagues.push(newLeague._id);
    await user.save();
    console.log(`saved: ${newLeague} : id: ${newLeague._id}`);
  } catch (err) {
    console.error(err);

    res.send("Error saving the league");
  }
});

router.get("/getUserLeague", async (req, res) => {
  // get all leagues associated with user
  const { user } = req.session;
  console.log(user);

  // get leagues id numbers
  const { leagues } = await Users.findById({ _id: user.id }, "leagues");
  console.log(leagues);
  //get information on retreived leagues
  const leagueDetails = await League.find({ _id: leagues });

  // for each leagueDetail get members, replace members field with actual member information.
  const leaguesWithUserInfo = await Promise.all(
    leagueDetails.map(async (league) => {
      const memberUserInfo = await Promise.all(
        league.members.map(async (memberId) => {
          return await Users.findById(memberId, "teamname score logo");
        })
      );

      //replace the member ids with the user information
      league.members = memberUserInfo;
      return league;
    })
  );
  //TODO need to change user table to allow for seperate league information
  res.send(leaguesWithUserInfo);
});

module.exports = router;
