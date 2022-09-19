// import GoalieStats from "../models/goalieschema";

const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

// const PlayerStats = require("../models/players");

const URI =
  "mongodb+srv://tlawrie:C3DCG5hZHkTzKvuG@cluster0.xxxbt.mongodb.net/fantasyh?retryWrites=true&w=majority";
// const URI = "mongodb://localhost:27017/players";

mongoose
  .connect(URI)
  .then(() => {
    console.log("db connection open");
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });

const playerSchema = new mongoose.Schema({
  number: Number,
  firstName: String,
  lastName: String,
  team: String,
  position: String,
  gamesPlayed: Number,
  goals: Number,
  assists: Number,
  points: Number,
  ppGoals: Number,
  ppAssists: Number,
  shGoals: Number,
  shAssists: Number,
  penaltyMins: Number,
  avgPoints: Number,
});

// creates collection, arg1 is name of collection, will pluralise, 2nd arg schema
const PlayerStats = mongoose.model("Playerstat", playerSchema);
// const reset = PlayerStats.deleteMany({});
// reset();

async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("tr"));
    return tds.map((tr) => tr.innerText);
  });

  let players = [];

  for (let i = 1; i <= 30; i++) {
    // generate random position
    const pNum = Math.floor(Math.random() * 5);
    let pos = "";
    if (pNum === 0) pos = "C";
    if (pNum === 1) pos = "LW";
    if (pNum === 2) pos = "RW";
    if (pNum === 3) pos = "LD";
    if (pNum === 4) pos = "RD";

    const player = data[i].split("\t");
    let playerSchema = {};
    const [first, last] = player[1].split(" ");
    playerSchema.number = parseInt(player[0]);
    playerSchema.firstName = first;
    playerSchema.lastName = last;
    playerSchema.team = player[2];
    playerSchema.position = pos;
    playerSchema.gamesPlayed = parseInt(player[3]);
    playerSchema.goals = parseInt(player[4]);
    playerSchema.assists = parseInt(player[5]);
    playerSchema.points = parseInt(player[6]);
    playerSchema.ppGoals = parseInt(player[7]);
    playerSchema.ppAssists = parseInt(player[8]);
    playerSchema.shGoals = parseInt(player[9]);
    playerSchema.shAssists = parseInt(player[10]);
    playerSchema.penaltyMins = parseInt(player[11]);
    playerSchema.avgPoints = parseInt(player[12]);

    players.push(playerSchema);
  }
  browser.close();
  // inserts array of objects into the db
  async function playerInsert() {
    await PlayerStats.insertMany(players)
      .then((data) => {
        console.log("success");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  playerInsert();
}

scrape(
  "https://www.icehockeyotago.co.nz/stats/division_instance/455241?subseason=802528&tab=division_instance_player_stats&tool=4855226"
);
