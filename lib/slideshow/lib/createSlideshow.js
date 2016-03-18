'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const async = require('async');
// const config = require('_/configs/slideshow-config');
const Slideshow = require('mongoose').model('slideshow');


function createSlideshow(options) {
  return (done) => {
    const slideshow = new Slideshow({
      name: options.path,
    });
    slideshow.save((err) => {
      if (err) {
        done(err);
      } else {
        done(slideshow);
      }
    });
  };
}

function createDir(options) {
  return (done) => {
    fs.mkdir(options.path, (err, data) => {
      if (err) {
        done(err);
      } else {
        done(data);
      }
    });
  };
}

// createSlideshow
module.exports = (options) => new Promise((resolve, reject) => {
  async.parallel({
    dir: createDir(options),
    data: createSlideshow(options),
  }, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
