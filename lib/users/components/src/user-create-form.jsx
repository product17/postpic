// @ifdef IS_NODE
'use strict';

const React = require('react');
// const _ = require('lodash');
// @endif

const UserCreateForm = React.createClass({
  render: () => (
      <div className="col-sm-6 col-sm-offset-3">
        <h4>Login</h4>
        <form action="/user/login" method="post">
          <input type="text" name="email" />
        </form>
      </div>
  ),
});

// @ifdef IS_NODE
exports = UserCreateForm;
// @endif
