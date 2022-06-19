const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/users");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3001;
const dbUrl = process.env.ATLAS_URI;

const app = express();

//body parser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(express.json());

// link to user routes
app.use("/users", require("./routes/users"));

// connect to db and start server on successful db connection
mongoose
  .connect(dbUrl)
  .then((res) => {
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((err) => console.log(err));
