'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.getUserById = (_id) => new Promise((resolve, reject) => {
  User.findOne({ _id })
  .then((user) => {
    resolve(user);
  })
  .catch((err) => {
    reject(err);
  });
});
