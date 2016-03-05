'use strict';

const React = require('react');
// const _ = require('lodash');

const UserDisplay = React.createClass({displayName: "UserDisplay",
  render: () => (
      React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
        React.createElement("h4", null, "User Display")
      )
  ),
});

exports = UserDisplay;
