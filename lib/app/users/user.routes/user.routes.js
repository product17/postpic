'use strict';

// Import dependencies
const express = require('express');
const router = express.Router();
const login = express.Router();
const passport = require('passport');
const presenter = require('./user.presenter');

// Display current user
router.route('/')
    .get(presenter.display);

exports.login = login;
exports.router = router;
