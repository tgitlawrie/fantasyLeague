const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// call to initiate logout localStorage.removeItem("token"))

//user login
router.post("/login", (req, res) => {
  const emailLogin = req.body;

  User.findOne({ email: emailLogin.email }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Email or Password" });
    }
    bcrypt.compare(emailLogin.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          teamname: dbUser.teamname,
          score: dbUser.score,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              message: "success",
              token: "Bearer " + token,
            });
          }
        );
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

    //TODO change score from 69 once calculations are done
    const dbUser = new User({
      teamname: "hard coded teamname serverside",
      email: user.email.toLowerCase().trim(),
      password: user.password,
      score: 69,
    });

    dbUser.save();
    res.json({ message: "success" });
  }
});

// route for user verification
router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, teamname: req.user.teamname });
});

// JWT verify middleware
function verifyJWT(req, res, next) {
  //get token from req headers, split off "Bearer " string
  const token = req.headers["x-access-token"]?.split(" ")[1];

  //if token exists verify else set isLoggedIn to false;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.teamname = decoded.teamname;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

module.exports = router;
