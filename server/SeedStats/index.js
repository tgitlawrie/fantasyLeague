// import GoalieStats from "../models/goalieschema";

const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

//const dbUrl
// const URI = "mongodb://localhost:27017/players";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection open");
  } catch (e) {
    console.log("connection failed", e);
  }
};
connectDB();

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
  score: {
    type: Number,
    default: 0,
  },
});

// creates collection, arg1 is name of collection, will pluralise, 2nd arg schema
const PlayerStats = mongoose.model("Playerstat", playerSchema);

const goalieSchema = new mongoose.Schema({
  number: Number,
  firstName: String,
  lastName: String,
  team: String,
  gamesPlayed: Number,
  minutes: Number,
  wins: Number,
  losses: Number,
  sol: Number,
  sog: Number,
  goalsAgainst: Number,
  goalsAgainstAvg: Number,
  savePct: Number,
  shutouts: Number,
});

const GoalieStats = mongoose.model("Goaliestat", goalieSchema);

// defined globally to make this easier
let players = []; // players array to hold player stats to be pushed to db
let goalies = [];

let isPlayersDone = false;

let scrape = async (url) => {
  const lastPage = 3;

  const browser = await puppeteer.launch();
  const page = await browser.newPage(); // create page
  await page.goto(url); // goto url

  const nextButton =
    "#division-player-sm-ice_hockey_skater > div:nth-child(4) > div.paginationNav > div > a:nth-child(5)";
  const goaliesTab = "#sm-ice_hockey_goalie > a";

  if (!isPlayersDone) {
    for (let i = 0; i < lastPage; i++) {
      // await page.waitForResponse(); // maybe dont need
      await getSkaters(page);
      if (i !== lastPage - 1) {
        await page.click(nextButton);
      } else {
        console.log("players done");
        isPlayersDone = true;
        await page.click(goaliesTab);
      }
    }
  }

  await getGoalies(page); // evaluate page for goalies, assumes there is only one page for goalie data
  console.log(players.length);
  console.log(goalies.length);
  browser.close();

  await playerInsert();
};

async function getSkaters(page) {
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("tr"));
    return tds.map((tr) => tr.innerText);
  });
  // console.log(data);
  console.log("getting skaters");
  // players loop
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
    // click next page
  }
}

async function getGoalies(page) {
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("tr"));
    return tds.map((tr) => tr.innerText);
  });

  console.log("getting goalies");
  // console.log(data);
  //goalies loop
  for (let i = 32; i <= 36; i++) {
    const goalie = data[i].split("\t");
    // console.log(goalie);
    let goalieSchema = {};
    const [first, last] = goalie[1].split(" ");
    goalieSchema.number = parseInt(goalie[0]);
    goalieSchema.firstName = first;
    goalieSchema.lastName = last;
    goalieSchema.team = goalie[2];
    goalieSchema.gamesPlayed = parseInt(goalie[3]);
    goalieSchema.minutes = parseInt(goalie[4]);
    goalieSchema.wins = parseInt(goalie[5]);
    goalieSchema.losses = parseInt(goalie[6]);
    goalieSchema.sol = parseInt(goalie[7]);
    goalieSchema.sog = parseInt(goalie[8]);
    goalieSchema.goalsAgainst = parseInt(goalie[9]);
    goalieSchema.goalsAgainstAvg = parseFloat(goalie[10]);
    goalieSchema.savePct = parseFloat(goalie[11]);
    goalieSchema.shutouts = parseInt(goalie[12]);

    // console.log(goalieSchema);
    goalies.push(goalieSchema);
  }
} // end of get goalies

scrape(
  "https://www.icehockeyotago.co.nz/stats/division_instance/455241?subseason=802528&tab=division_instance_player_stats&tool=4855226"
);

// inserts array of objects into the db
async function playerInsert() {
  try {
    // reset DB
    await PlayerStats.deleteMany({});
    await GoalieStats.deleteMany({});
    await PlayerStats.insertMany(players);
    console.log("players inserted");

    await GoalieStats.insertMany(goalies);
    console.log("goalies inserted");

    mongoose.connection.close();
    console.log("connection closed");
  } catch (error) {
    console.log("insert failed");
    mongoose.connection.close();
    console.log("connection closed");
  }
}
