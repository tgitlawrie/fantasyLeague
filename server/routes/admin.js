// admin routes
const express = require("express");
const Settings = require("../models/settingsschema");

const router = express.Router();

//routes go here
router.get("/points", (req, res) => {
  Settings.findOne({ name: "Points" }).then((points) => {
    res.send(points);
  });
});

router.post("/points", async (req, res) => {
  try {
    await Settings.updateOne(
      { _id: req.body.id },
      { $set: { value: req.body.settings } }
    );
    res.send("successfully updated settings");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
  // await Settings.updateOne({_id:})
});

module.exports = router;
