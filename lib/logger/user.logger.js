'use strict';

// Init the logger
const bunyan = require('bunyan').createLogger({ name: 'user' });


// Export the logger
exports = bunyan;
