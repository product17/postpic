'use strict';

const logger = require('_/logger').slideshow;
const slideshow = require('_/slideshow').api;

module.exports = (req, res, next) => {
  slideshow.createSlideshow({ path: req.params.name })
  .then((result) => {
    res.json(result);

    return null;
  })
  .catch((err) => {
    logger.error(err);
    next(err);

    return null;
  });
};
