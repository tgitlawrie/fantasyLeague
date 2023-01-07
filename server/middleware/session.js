const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

// create a new MongoStore instance using the mongoose connection
const store = new MongoStore({
  uri: process.env.ATLAS_URI,
  collection: "sessions",
});

module.exports = (app) => {
  console.log("middleware called");
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, maxAge: 36000000 },
      store: store,
    })
  );
};
//TODO change ttl to something reasonable
