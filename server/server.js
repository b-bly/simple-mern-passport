const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
require("./database");

const passport = require("./passport");
const app = express();
const PORT = 8080;
// Route requires
const user = require("./routes/user");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
