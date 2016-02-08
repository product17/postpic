'use strict';

const env = process.env.NODE_ENV;

const config = {
  development: {
    db_path: 'mongodb://localhost/postpic',
  },
  production: {
    db_path: 'mongodb://localhost/postpic',
  },
};

module.exports = function getEnv() {
  return config[env];
};
