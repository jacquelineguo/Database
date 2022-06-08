const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const userDDBModel = require('../models/UserDDB');
const keys = require('../config/keys');

// store the data to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// take out the user id from session
passport.deserializeUser((id, done) => {
  userDDBModel.get({"id": id}).then(user => {
    done(null, user);
  });
});


// configure the GoogleStrategy
// and if succeed, execute the async function to load or create user
passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    
    const esistingUserFromDDB = await userDDBModel.scan("googleId").eq("103805923715121791269").exec();

    if(esistingUserFromDDB[0]) {
      // we already have a record with the given profile ID
      done(null, esistingUserFromDDB[0]);
      console.log("done");
    }
  })
);
