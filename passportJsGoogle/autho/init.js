var passport = require('passport');
var Google = require('../model/google');


module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Google.findById(id,  (err, user) => {
      done(err, user);
    });
  });

};