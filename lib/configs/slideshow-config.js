'use strict';

const path = require('path');
const env = process.env.NODE_ENV;

const config = {
  development: {
    path: path.resolve('_'),
  },
  production: {
    path: '',
  },
};

module.exports = function getEnv() {
  return config[env];
};
