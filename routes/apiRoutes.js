const db = require("../models");
const axios = require("axios");

module.exports = function(app, passport) {
  // Allowing users to update their profile information
  app.put("/api/users/:id", function(req, res) {
    // Making sure the user is the account owner
    if (req.params.id != req.user.id) {
      return res.status(500).end();
    }
    // Limiting amount of information that may be changed
    var updatedInfo = {};
    if (req.body.displayName) {
      updatedInfo.displayName = req.body.displayName;
    }
    if (req.body.blurb) {
      updatedInfo.blurb = req.body.blurb;
    }
    db.User.update(updatedInfo, { where: { id: req.params.id } })
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).end();
      });
  });

  // Storing material into the users' favorites
  app.post("/api/favorite", function(req, res) {
    db.Favorite.create({
      type: req.body.type,
      title: req.body.title,
      score: req.body.score,
      url: req.body.url,
      videoId: req.body.videoId,
      UserId: req.user.id
    })
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).end();
      });
  });

  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local", { failWithError: true }), function(req, res) {
  //   res.json("/");
  // },
  // function(err, req, res, next) {
  //   // Handle error
  //   console.log("Handling error", err);
  //   return res.status(401).send({ success: false, message: err })
  // });
  app.post("/api/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        console.log(err); 
        return next(err); 
      }

      if (!user) { 
        return res.json({sucess: false, ...info})
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({success: true});
      });
    })(req, res, next);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log("Authentication Error Occurred: " + err);
        res.json(err);
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
      console.log(req.user);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //Routes for search engines
  app.get("/api/youtube", function(req, res) {
    if (!req.query || !req.query.q) return res.status(404).end();
    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet";
    url += "&maxResults=9";
    url += "&q=" + req.query.q.replace(" ","+");

    // Making sure the search is code related
    if (req.query.q.toLowerCase().indexOf("coding") === -1) url += "+coding";

    url += "&key=" + process.env.youtube_key;
    axios.get(url)
    .then(function(resp) {
      const items = resp.data.items;
      res.json({
        items : items
      })
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).end();
    });
  });
};
