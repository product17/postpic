'use strict';

/**
 * Module dependencies.
 */
const passport = require('passport');
const User = require('mongoose').model('User');
const path = require('path');
const glob = require('glob');

/**
 * Module init function.
 */
module.exports = function passportEncoding() {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id,
    }, { password: 0, salt: 0 }, (err, user) => {
      done(err, user);
    });
  });

  // Initialize strategies
  glob('./configs/strategies/*.js', { sync: true }).forEach((strategy) => {
    require(path.resolve(strategy))();
  });
};
