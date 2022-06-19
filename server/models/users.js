const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
