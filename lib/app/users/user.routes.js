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

// Create route for signup form and post
router.route('/create')
    .get(presenter.createForm)
    .post(presenter.create);

// Edit form and update post
router.route('/edit')
    .get(presenter.editForm)
    .post(presenter.update);

// Login form and post
login.route('/login')
    .get(presenter.loginForm)
    .post(passport.authenticate('local', {
      successRedirect: '/user',
      failureRedirect: '/login',
      failureFlash: 'Incorrect username or password.',
    }));

// Logout get request
login.router('/logout')
    .get(presenter.logout);

exports.login = login;
exports.router = router;
