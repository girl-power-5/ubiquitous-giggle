// Requiring our models and passport 
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using handlebars to render static html pages...
  app.get("/", function(req, res) {
    res.render("index");
  });
  
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/newevent/:profileID", function(req, res) {
    var selectedProfile = req.params.profileID;
    res.render("newevent", {profileID: selectedProfile});
  });


  app.get("/newprofile", function(req, res) {
    res.render("newprofile");
  });

  app.get("/editprofile", function(req, res) {
    res.render("editprofile");
  });

  // Route to get all of the user's profiles and render to their main page after logging in
  app.get("/dashboard/:id", function(req, res) {
    db.Profile.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(data) {

      var profileData = {
      }
      
      for (let i =0; i<data.length; i++) {
        profileData[i] = {
          id: data[i].id,
          firstName: data[i].first_name,
          lastName: data[i].last_name,
          relationship: data[i].relationship
        }
      }
 
      res.render("dashboard", {profile: profileData})      

    })
  });
 
  // Route to get an individual profile and render it to user's page
  app.get("/view/:profileID", function(req, res) {

    var selected = req.params.profileID
    console.log('req params ', req.params.profileID)
    console.log(selected)
    db.Profile.findOne({
      where: {
        id: selected
      }
      }).then(function(data) {
        var individualProfile = {
          firstName: data.first_name,
          lastName: data.last_name,
          relationship: data.relationship,
          birthday: data.birthday,
          email: data.email,
          phoneNumber: data.phone_number,
          id: selected
        }

        res.render("view", {profile: individualProfile})      
      })
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {

    // Send back information about the user currently logged in
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST method for adding a new profile to a user's account/dashboard
  app.post("/api/newprofile", function(req, res) {
    db.Profile.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      relationship: req.body.relationship,
      UserId: req.user.id
    }).then(function() {
      res.json(req.user);
    })
  });

  app.post("/api/newevent/:profileID", function(req ,res) {
    console.log("backend new event req ", req.body);
    //Profile.findByPrimary().then()
    db.Event.create({
      type: req.body.type,
      name: req.body.name,
      start_date: req.body.start_date,
      profiles: [
        {id: req.params.id}
      ]
    }, {
      include: [{
        association: db.Profile,
        //include: [ db.Profile ]
      }]
    }
    ).then(function([event, profile]) {
      res.json(req.user);
    });
  });

};