const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

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

async function scrape(url) {
  const playerSchema = new mongoose.Schema({
    number: Number,
    firstName: String,
    lastName: String,
    team: String,
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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("tr"));
    return tds.map((tr) => tr.innerText);
  });

  let players = [];

  for (let i = 1; i <= 30; i++) {
    const player = data[i].split("\t");
    let playerSchema = {};
    const [first, last] = player[1].split(" ");
    playerSchema.number = parseInt(player[0]);
    playerSchema.firstName = first;
    playerSchema.lastName = last;
    playerSchema.team = player[2];
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
  PlayerStats.insertMany(players)
    .then((data) => {
      console.log("success");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

scrape(
  "https://www.icehockeyotago.co.nz/stats/division_instance/455241?subseason=802528&tab=division_instance_player_stats&tool=4855226"
);
