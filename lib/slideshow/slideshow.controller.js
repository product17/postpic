'use strict';

const Promise = require('blue-bird');
const fs = require('fs');


// addImage

// removeImage

// createSlideshow
exports.createSlideshow = (options) => new Promise((resolve, reject) => {
  fs.mkdir(options.path, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
