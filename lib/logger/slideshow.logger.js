'use strict';

// Init the logger
const bunyan = require('bunyan').createLogger({ name: 'slideshow' });


// Export the logger
module.exports = bunyan;
