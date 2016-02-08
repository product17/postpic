'use strict';

const express = require('express');
const path = require('path');

// Link to the different modules for the site
const users = require('../app/users').routes;

// Init the app
const app = express();

// Set the views for all the apps
app.set('views', path.join(__dirname, '../views'));

// Set the root paths
app.use('/', users.login);
app.use('/user', users.router);

// Export the app
module.exports = app;
