'use strict';

const React = require('react');
// const _ = require('lodash');

const UserCreateForm = React.createClass({displayName: "UserCreateForm",
  render: () => (
      React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
        React.createElement("h4", null, "Login"), 
        React.createElement("form", {action: "/user/login", method: "post"}, 
          React.createElement("input", {type: "text", name: "email"})
        )
      )
  ),
});

exports = UserCreateForm;
