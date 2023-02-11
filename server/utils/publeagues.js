const { createNewRedraft, createNewHeadtoHead } = require("./defaultleagues");
const League = require("../models/leagueschema");

module.exports = async function createPublicLeagues() {
  const redraft = await League.exists({
    isPublic: true,
    leagueMode: "redraft",
  });
  const head2head = await League.exists({
    isPublic: true,
    leagueMode: "head2head",
  });
  if (redraft && head2head) {
    console.log("public leagues found \u2713");
  } else {
    //TODO add other 2 leaguemodes
    //only create redraft and head2head for now
    if (!redraft) await createNewRedraft();
    if (!head2head) await createNewHeadtoHead();
  }
};
