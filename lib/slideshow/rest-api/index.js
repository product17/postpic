'use strict';

const _ = require('lodash');
const path = require('path');
const glob = require('glob');


const fileList = glob.sync('./lib/slideshow/rest-api/!(index).js');


_.forEach(fileList, (fileName) => {
  module.exports[path.basename(fileName, '.js')] = require(`./${path.basename(fileName)}`);
});
