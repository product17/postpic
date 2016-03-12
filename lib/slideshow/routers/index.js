'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const slideshow = require('_/slideshow/slideshow.controller');


router.route('/create')
// switch this to a PUT request later
    .get(slideshow.createSlideshow);


app.use();

module.exports = app;
