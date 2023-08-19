const mongoose = require("mongoose");
const PlayerStats = require("../models/players");
const GoalieStats = require("../models/goalieschema");

mongoose.connect(
  "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

(async function () {
  try {
    // create a backup of the existing documents
    const players = await PlayerStats.find();
    await mongoose.connection.db
      .collection("PlayerStatsBackup")
      .insertMany(players);
    console.log("A backup of the existing documents has been created.");

    const goalies = await GoalieStats.find();
    mongoose.collection.insertMany(goalies);
    console.log("A backup of the goalies has be made.");

    // update the score field on the original documents
    // for (let player of players) {
    //   await PlayerStats.updateOne({ _id: player._id }, { $set: { score: 0 } });
    // }
    // // update the score field on the original documents
    // for (let goalie of goalies) {
    //   await GoalieStats.updateOne({ _id: goalie._id }, { $set: { score: 0 } });
    // }
    console.log("All documents have been updated.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
