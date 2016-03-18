'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const slideshow = require('_/slideshow').router;

// Link to the different modules for the site
// const users = require('_/users').router;


// Set the views for all the apps
// app.set('views', path.resolve(__dirname, '/views'));

// Set the root paths
// app.use('/', users.login);
// app.use('/user', users.router);

app.use('/slideshow', slideshow);
router.route('/').get((req, res) => {
  res.json({ message: 'success' });
});
app.use(router);

// Export the app
module.exports = app;
