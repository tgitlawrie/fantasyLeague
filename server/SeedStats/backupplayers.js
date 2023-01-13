const mongoose = require("mongoose");
const PlayerStats = require("../models/players");

mongoose.connect(
  "mongodb+srv://tlawrie:C3DCG5hZHkTzKvuG@cluster0.xxxbt.mongodb.net/fantasyh?retryWrites=true&w=majority",
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

    // update the score field on the original documents
    for (let player of players) {
      await PlayerStats.updateOne({ _id: player._id }, { $set: { score: 0 } });
    }
    console.log("All documents have been updated.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
