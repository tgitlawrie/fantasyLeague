const express = require("express");
const User = require("../models/users");
const Players = require("../models/players");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../cloudinary/index.js");

// call to initiate logout localStorage.removeItem("token"))

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
          const payload = {
            id: dbUser._id,
            teamname: dbUser.teamname,
            score: dbUser.score,
            team: getTeam,
            bench: dbUser.bench,
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
                payload,
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
      score: 69,
    });
    console.log(dbUser);
    dbUser.save();
    res.json({ message: "success" });
  }
});

router.post("/team", verifyJWT, async (req, res) => {
  console.log(`from server:${req.body}`);
});

router.get("/draft", verifyJWT, (req, res) => {});
router.get("/", verifyJWT, (req, res) => {});

// route for user verification
router.get("/isUserAuth", verifyJWT, (req, res) => {
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
// JWT verify middleware
function verifyJWT(req, res, next) {
  //get token from req headers, split off "Bearer " string
  // const token = req.headers["x-access-token"]?.split(" ")[1];
  const token = req.headers["x-access-token"];
  console.log(token);

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
