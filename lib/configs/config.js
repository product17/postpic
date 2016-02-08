'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const glob = require('glob');

/**
 * Load app configurations
 */
module.exports = _.extend(
  require('./env/all'),
  require('./env/' + process.env.NODE_ENV) || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function getGlobbedFiles(globPatterns, removeRoot) {
  // For context switching
  const _this = this;

  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      glob(globPatterns, {
        sync: true,
      }, (err, files) => {
        if (removeRoot) {
          files = files.map((file) => file.replace(removeRoot, ''));
        }

        output = _.union(output, files);
      });
    }
  }

  return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function getJavaScriptAssets(includeTests) {
  let output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

  // To include tests
  if (includeTests) {
    output = _.union(output, this.getGlobbedFiles(this.assets.tests));
  }

  return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function getCSSAssets() {
  const output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
  return output;
};
