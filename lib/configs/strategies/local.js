'use strict';

/**
 * Module dependencies.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function localStrategy() {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findOne({
      email,
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user or invalid password',
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Unknown user or invalid password',
        });
      }

      return done(null, user);
    });
  }));
};
