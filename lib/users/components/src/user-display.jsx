// @ifdef IS_NODE
'use strict';

const React = require('react');
// const _ = require('lodash');
// @endif

const UserDisplay = React.createClass({
  render: () => (
      <div className="col-sm-6 col-sm-offset-3">
        <h4>User Display</h4>
      </div>
  ),
});

// @ifdef IS_NODE
exports = UserDisplay;
// @endif
