// @ifdef IS_NODE
'use strict';

const React = require('react');
const _ = require('lodash');
// @endif

class UserNew extends React.component({
  render: function() {
    var form_schema = this.state.form_schema ? this.state.form_schema : this.props.form_schema;

    const fields = _.map(form_schema, (field, i) =>
      (<FormField key={i} field_info={field} />));

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <h4>Login</h4>
        <form action='/user/login' method='post'>
          {fields}
        </form>
      </div>
    );
  },
})


// @ifdef IS_NODE
exports = UserNew;
// @endif
