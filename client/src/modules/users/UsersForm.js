import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'

class UsersForm extends Component {
  constructor(props) {
    super(props);

    this.state = props.user;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(state, value) {
    let newState = {
      [state]: value
    };

    this.setState(newState)
  }

  componentWillReceiveProps(props) {
    this.setState(props.user);
  }

  render() {
    const textFieldStyle = { width: '100%' };
    const paperStyle = {
      width: '100%',
      margin: '0 auto',
      padding: '0 10px'
    };

    return (
      <Paper style={paperStyle} zDepth={0}>
        <TextField
          id="text-field-controlled"
          floatingLabelText="Name"
          style={textFieldStyle}
          value={this.state.name}
          onChange={e => this.handleChange('name', e.target.value)}
        />
        <TextField
          id="text-field-controlled"
          floatingLabelText="Username"
          style={textFieldStyle}
          value={this.state.username}
          onChange={e => this.handleChange('username', e.target.value)}
        />
        <TextField
          id="text-field-controlled"
          floatingLabelText="Email"
          style={textFieldStyle}
          value={this.state.email}
          onChange={e => this.handleChange('email', e.target.value)}
        />
        <RaisedButton label="Save" primary={true} onClick={() => this.props.onSubmit(this.state)} />
      </Paper>
    );
  }
}

UsersForm.defaultProps = {
  onSubmit: null,
  user: {
    username: '',
    name: '',
    email: ''
  }
};

export default UsersForm;
