'use strict';

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const slideshow = require('_/slideshow').restAPI;


// app.set('views', path.resolve(__dirname, '/views'));

router.route('/create/:name')
// switch this to a PUT request later
    .get(slideshow.createSlideshow);


app.use(router);

module.exports = app;
