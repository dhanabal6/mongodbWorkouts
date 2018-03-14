var passport = require('passport');
var GoogleStrategy = require('passport-google-auth').Strategy;

var Google = require('../model/google');
var config = require('./auth');
var init = require('./init');

passport.use(new GoogleStrategy({
    clientId: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  },
  (token, tokenSecret, profile, done) => {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };
    Google.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

init();


module.exports = passport;