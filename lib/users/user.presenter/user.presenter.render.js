'use strict';

const react = require('react');
const reactDOM = require('react-dom/server');
const logger = require('_/logger');

// Load controller
const controller = require('../user.controller');

// Include Components
const compUserDisplay = require('../components/build/user-display');

// Setup Components
const userDisplay = react.createFactory(compUserDisplay);

exports.display = (req, res) => {
  controller.getUserById()
  .then((user) => {
    const page = {
      user: req.user,
      displayUser: user,
    };

    res.render('index', {
      reactContent: reactDOM.renderToString(userDisplay(page)),
      clientContent: page,
    });

    return null;
  })
  .catch((err) => {
    logger.error(err);
    return null;
  });
};
