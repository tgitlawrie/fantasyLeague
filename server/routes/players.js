const express = require("express");
const mongoose = require("mongoose");
const PlayerStat = require("../models/players");
const router = express.Router();

router.post("/all", async (req, res) => {
  try {
    const players = await PlayerStat.find({});
    res.json({ players });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
