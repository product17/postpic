'use strict';

const _ = require('lodash');

exports = _.assign({}
  , require('./user.presenter.auth')
  , require('./user.presenter.create')
  , require('./user.presenter.render')
  , require('./user.presenter.update')
  , require('./user.presenter.destroy')
);
