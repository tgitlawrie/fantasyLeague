const express = require("express");
const PlayerStats = require("../models/players");
const User = require("../models/users");
const router = express.Router();
const { cloudinary } = require("../cloudinary/index.js");

router.post("/all", async (req, res) => {
  try {
    const players = await PlayerStats.find({});
    res.json({ players });
  } catch (error) {
    console.log(error);
  }
});

router.get("/team/draft", async (req, res) => {
  // get 3 random players from each position
  const C = await PlayerStats.aggregate([
    { $match: { position: "C" } },
    { $sample: { size: 3 } },
  ]);
  const LW = await PlayerStats.aggregate([
    { $match: { position: "LW" } },
    { $sample: { size: 3 } },
  ]);
  const RW = await PlayerStats.aggregate([
    { $match: { position: "RW" } },
    { $sample: { size: 3 } },
  ]);
  const LD = await PlayerStats.aggregate([
    { $match: { position: "LD" } },
    { $sample: { size: 3 } },
  ]);
  const RD = await PlayerStats.aggregate([
    { $match: { position: "RD" } },
    { $sample: { size: 3 } },
  ]);
  const G = await PlayerStats.aggregate([
    { $match: { position: "G" } },
    { $sample: { size: 3 } },
  ]);
  // console.log(res.json({ C, LW, RW, LD, G }));
  return res.json({ C, LW, RW, LD, RD, G });
});

// route to save team to the db
router.post("/team/new", async (req, res) => {
  //  //need userID
  const { C, LW, RW, LD, RD, G, user, name, logo } = req.body;
  const playerArray = [C._id, LW._id, RW._id, LD._id, RD._id, G._id];

  const finalTeam = await User.findById(user);
  finalTeam.teamname = name;
  finalTeam.logo = logo;
  finalTeam.team = playerArray;
  await finalTeam.save();

  res.send({ message: "success" });
});

// router.post("/team/logo", async (req, res) => {
//   const imageId = req.body.logoID;
//   const options = {
//     resource_type: "image",
//     height: 150,
//     width: 150,
//   };
//   const transformations = {
//     height: 150,
//     width: 150,
//     crop: "scale",
//   };

//   // gets asset id of selected image
//   const url = await cloudinary.api.resource(imageId, options, (error, res) => {
//     if (error) console.log(error);
//   });
//   res.send(url.asset_id);
// });

module.exports = router;
