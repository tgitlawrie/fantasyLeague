const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

// Connect to the database
const URI = "mongodb+srv://tlawrie:C3DCG5hZHkTzKvuG@cluster0.xxxbt.mongodb.net/fantasyh?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connection open");
});

// Define the player schema
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

// Create the PlayerStats model
const PlayerStats = mongoose.model("Playerstat", playerSchema);

async function scrape(url) {
  // Launch Puppeteer and open a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL and wait for the page to load
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Scrape the data
  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("tr"));
    return tds.map((tr) => tr.innerText);
  });

  let players = [];

  for (let i = 1; i <= 30; i++) {
    // Generate random position
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

  // Close the browser
  browser.close();

  // Insert the players into the database
  const result = await PlayerStats.bulkWrite(
    players.map((player) => ({
      insertOne: {
        document: player,
      },
    }))
  );

  console.log(`Inserted ${result.insertedCount} players into the database.`);
  mongoose.connection.close();
}

// Scrape the data
scrape(
  "https://www.icehockeyotago.co.nz/stats/division_instance/455241?subseason=11817"
);

