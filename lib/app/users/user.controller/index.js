'use strict';

const _ = require('lodash');

exports = _.assign({}
  , require('./user.controller.auth')
  , require('./user.controller.create')
  , require('./user.controller.render')
  , require('./user.controller.update')
  , require('./user.controller.destroy')
);
