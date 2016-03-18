'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SlideshowSchema = new Schema({
  name: {
    type: String,
  },
});

mongoose.model('slideshow', SlideshowSchema);
