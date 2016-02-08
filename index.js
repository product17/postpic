'use strict';

const chalk = require('chalk');
const mongoose = require('mongoose');

// Setup Database connection
const db = mongoose.connect('mongodb://localhost/task-react', (err) => {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

// Init the express application
const app = require('_/configs/express-config')(db);

// Run the passport configs
require('_/configs/passport-config')();

module.exports = app;
