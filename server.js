// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport
var passport = require("./config/passport");


// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//here should reference the folder path as "public"
app.use(express.static("public"));

// Tell our express app to use handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api.js")(app)

// Syncing our database and letting the user know they successfully connected
db.sequelize.sync({alter: true}).then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  });
});