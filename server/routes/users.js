const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose"); // import mongoose

const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

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
    bcrypt.compare(emailLogin.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        req.session.user = {
          id: dbUser._id,
          teamname: dbUser.teamname,
          score: dbUser.score,
        };
        console.log(req.session.user);
        return res.json({
          message: "success",
        });
      } else {
        return res.json({
          message: "Invalid Email or Password",
        });
      }
    });
  });
});

// user registration
router.post("/register", async (req, res) => {
  const user = req.body;

  // check if teamname or email has been taken allready
  const takenTeam = await User.findOne({ teamname: user.teamname });
  const takenEmail = await User.findOne({ email: user.email });

  if (takenTeam) {
    res.json({ message: "That team name is allready taken" });
  } else if (takenEmail) {
    res.json({ message: "That email is allready in use" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      teamname: "",
      email: user.email.toLowerCase().trim(),
      password: user.password,
      score: 0,
    });

    dbUser.save();
    res.json({ message: "success" });
  }
});

module.exports = router;