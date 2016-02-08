'use strict';

const react = require('react');
const reactDOM = require('react-dom/server');
const logger = require('_/logger');

// Load controller
const controller = require('../user.controller');

// Include Components
const compUserCreate = require('../components/build/user-create');

// Setup Components
const userCreate = react.createFactory(compUserCreate);

// Create form
exports.createForm = (req, res) => {
  const page = {
    user: req.user,
    formData: req.body,
  };

  res.render('index', {
    reactContent: reactDOM.renderToString(userCreate(page)),
    clientContent: page,
  });
};

// Create new user
exports.create = (req, res) => {
  controller.create(req.body)
  .then((user) => {
    res.redirect('/user');
    return null;
  })
  .catch((err) => {
    logger.error(err);
    return null;
  });
};
