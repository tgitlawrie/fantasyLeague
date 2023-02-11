const League = require("../models/leagueschema");
const mongoose = require("mongoose");
// creates a defualt setting public redraft extracted
// to function so it can be called when current leagues reach near full
async function createNewRedraft() {
  console.log("Creating new redraft league..");
  const newRedraft = new League({
    leagueName: "Public redraft",
    lockedInvites: false,
    members: [
      {
        isDraftDone: false,
      },
    ],
    leagueMode: "redraft",
    maxSize: 50,
    isPublic: true,
  });
  try {
    await newRedraft.save();
    console.log("New Redraft Created! \u2713");
  } catch (error) {
    console.error(`New Redraft: ${error}`);
  }
}

async function createNewHeadtoHead() {
  //vs array will store who vs who
  console.log("Creating new head to head league..");
  const newHeadtoHead = new League({
    leagueName: "Public H2H",
    lockedInvites: false,
    leagueMode: "head2head",
    maxSize: 50,
    isPublic: true,
  });
  try {
    await newHeadtoHead.save();
    console.log("New HeadtoHead Created! \u2713");
  } catch (error) {
    console.error(`New Head2Head: ${error}`);
  }
}

module.exports = { createNewRedraft, createNewHeadtoHead };
