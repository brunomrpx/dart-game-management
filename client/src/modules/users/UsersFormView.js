import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import Snackbar from 'material-ui/Snackbar';

import UsersForm from './UsersForm';
import UsersResource from './UsersResource';

class UsersFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {
        show: false,
        text: ''
      }
    };

    this.saveUser = this.saveUser.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
  }

  saveUser(data) {
    let promise;
    let text;

    if (data._id) {
      promise = UsersResource.update(data._id, data);
      text = 'User successfully updated';
    } else {
      promise = UsersResource.create(data);
      text = 'User successfully created';
    }

    promise.then(result => {
      this.setState({
        user: result.user,
        message: {
          show: true,
          text: text
        }
      });
    });
  }

  resetMessage() {
    this.setState({
      message: {
        show: false,
        text: ''
      }
    });
  }

  componentDidMount() {
    let userId = this.props.params.id;

    if (!userId) {
      return;
    }

    UsersResource.getById(userId).then(response => {
      this.setState({ user: response.user });
    });
  }

  render() {
    return (
      <div>
        <Snackbar
            action="Go to list"
            open={this.state.message.show}
            message={this.state.message.text}
            autoHideDuration={4000}
            onActionTouchTap={() => browserHistory.push('/users')}
            onRequestClose={this.resetMessage}
          />
        <UsersForm onSubmit={this.saveUser} user={this.state.user} />
      </div>
    );
  }
}

export default UsersFormView;
