const Settings = require("../models/settingsschema");

module.exports = async function initSettings() {
  // check if settings model has documents, if not create them
  const settingsCount = await Settings.countDocuments();
  if (settingsCount > 0) {
    console.log("Settings checked");
    return;
  }
  //initialise settings, points is an empty object as defaults are assigned in the schema
  const defaultSettings = new Settings({
    points: {},
  });

  await defaultSettings.save();
};
