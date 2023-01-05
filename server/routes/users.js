const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = express.Router();
const bcrypt = require("bcrypt");

const { cloudinary } = require("../cloudinary/index.js");

const User = require("../models/users");
const Players = require("../models/players");
const Goalies = require("../models/goalieschema");

// create a new MongoStore instance using the mongoose connection
const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URI,
  ttl: 604800, // 7 days
  autoRemove: "interval",
  autoRemoveInterval: 10, // 10 minutes
});

// use the session middleware with the MongoStore instance
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxage: 5 * 24 * 60 * 60 * 1000, rolling: true },
    store: store,
  })
);

//user login
router.post("/login", (req, res) => {
  const emailLogin = req.body;

  User.findOne({ email: emailLogin.email }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Email or Password" });
    }
    bcrypt
      .compare(emailLogin.password, dbUser.password)
      .then(async (isCorrect) => {
        //get players associated with team, assign to team.
        if (isCorrect) {
          const getTeam = await Players.find({
            _id: { $in: dbUser.team },
          });
          const getGoalie = await Goalies.find({
            _id: { $in: dbUser.team },
          });
          const team = [...getTeam, ...getGoalie];
          req.session.user = {
            id: dbUser._id,
          };
          const payload = {
            id: dbUser._id,
            teamname: dbUser.teamname,
            score: dbUser.score,
            team: team,
            logo: dbUser.logo,
            bench: dbUser.bench,
          };
          return res.json({
            message: "success",
            payload,
          });
        }
      });
  });
});
// user registration
router.post("/register", async (req, res) => {
  const user = req.body;
  // check if teamname or email has been taken allready
  const takenEmail = await User.findOne({ email: user.email });

  if (takenEmail) {
    res.json({ message: "That email is allready in use" });
    console.log("taken email");
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    //TODO change score from 69 once calculations are done
    const dbUser = new User({
      email: user.email.toLowerCase().trim(),
      password: user.password,
      score: 0,
    });
    console.log(dbUser);
    dbUser.save();
    res.json({ message: "success" });
  }
});

router.post("/team", async (req, res) => {
  console.log(`from server:${req.body}`);
});

router.get("/draft", (req, res) => {});
router.get("/", (req, res) => {});

// route for user verification
router.get("/isUserAuth", (req, res) => {
  res.json({ isLoggedIn: true, teamname: req.user.teamname });
});

router.get("/logos", async (req, res) => {
  let logos = [];
  const options = {
    resource_type: "image",
    max_results: 50,
  };
  const transformations = {
    width: 200,
    height: 200,
  };
  async function listResources(next_cursor) {
    if (next_cursor) {
      options["next_cursor"] = next_cursor;
    }
    await cloudinary.api.resources_by_tag("hockey", options, (error, res) => {
      if (error) {
        console.log(error);
      }
      const more = res.next_cursor;
      const resources = res.resources;
      for (let res in resources) {
        res = resources[res];
        const url = res.secure_url;
        const id = res.public_id;
        const assetID = res.asset_id;
        logos.push({ id, url, assetID });
      }
      if (more) {
        listResources(more);
      } else {
        console.log("done");
        // console.log(JSON.stringify(logos));
        return logos;
      }
    });
  }
  await listResources(null);
  res.send(logos);
  // console.log(res.json(logos));
});

module.exports = router;
