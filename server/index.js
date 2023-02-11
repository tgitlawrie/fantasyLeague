if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const initSettings = require("./utils/settings");
const createPublicLeagues = require("./utils/publeagues");

const port = process.env.PORT || 3001;
const dbUrl = process.env.ATLAS_URI;

const app = express();

// create a new MongoStore instance using the mongoose connection
const store = new MongoStore({
  uri: process.env.ATLAS_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 36000000 },
    store: store,
  })
);

//body parser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(express.json());

// link to user routes
app.use("/users", require("./routes/users"));
app.use("/players", require("./routes/players"));
app.use("/admin", require("./routes/admin"));
app.use("/league", require("./routes/league"));
// connect to db and start server on successful db connection
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => console.log(`Server \u2713`));
    console.log("database \u2713");
    initSettings(); // initialise settings
    createPublicLeagues();
  })
  .catch((err) => console.log(err));
