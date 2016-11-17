import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { red500, blue500 } from 'material-ui/styles/colors';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Snackbar from 'material-ui/Snackbar';

import UsersResource from './UsersResource';

class UsersListView extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedRows: [],
      canRemove: false,
      canEdit: false,
      message: {
        show: false,
        text: ''
      }
    };

    this.goToPage = this.goToPage.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.getActionState = this.getActionState.bind(this);
    this.removeSelectedUsers = this.removeSelectedUsers.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
  }

  goToPage(page) {
    browserHistory.push(page);
  }

  handleRowSelection(selectedRows) {
    let newState = this.getActionState(selectedRows);
    this.setState(newState);
  }

  removeSelectedUsers(e) {
    let selectedRows = this.state.selectedRows;
    let users = this.state.users;

    let ids = [];

    if (selectedRows === 'all') {
      ids = users.map(u => u._id);
    } else {
      ids = selectedRows.map(i => users[i]._id);
    }

    ids = ids.join(',');

    UsersResource.delete(ids).then(() => {
      this.setState({
        canRemove: false,
        canEdit: false,
        selectedRows: []
      });
    })
    .then(this.loadUsers)
    .then(() => {
      this.setState({
        message: {
          show: true,
          text: 'Users successfully removed'
        }
      });
    });
  }

  getActionState(selectedRows) {
    let result = selectedRows.slice(0);
    let newState = {};

    if (result === 'none' || result.length === 0) {
      newState.canRemove = false;
      newState.canEdit = false;
      newState.selectedRows = [];
      return newState;
    }

    newState.selectedRows = result;

    if (result === 'all') {
      newState.canEdit = false;
      newState.canRemove = true;
      return newState;
    }

    if (result.length === 1) {
        newState.canRemove = true;
        newState.canEdit = true;
    } else {
        newState.canRemove = true;
        newState.canEdit = false
    }

    return newState;
  }

  loadUsers() {
    UsersResource.getAll().then(result => {
      this.setState({ users: result.users });
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  resetMessage() {
    this.setState({
      message: {
        show: false,
        text: ''
      }
    });
  }

  render() {
    const buttonsContainerStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      width: 56,
      position: 'fixed',
    };

    const buttonStyle = {
      marginTop: 15
    }

    return (
      <div>
        <Snackbar
          open={this.state.message.show}
          message={this.state.message.text}
          autoHideDuration={4000}
          onRequestClose={this.resetMessage}
        />
        <div style={buttonsContainerStyle}>
          <FloatingActionButton style={buttonStyle} onClick={ e => this.goToPage('/users/new')}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton style={buttonStyle} backgroundColor={red500} disabled={!this.state.canRemove} onClick={this.removeSelectedUsers}>
            <ContentRemove />
          </FloatingActionButton>
          <FloatingActionButton style={buttonStyle} backgroundColor={blue500} disabled={!this.state.canEdit} onClick={ e => this.goToPage('/users/edit/' + this.state.users[this.state.selectedRows[0]]._id )}>
            <ContentCreate />
          </FloatingActionButton>
        </div>
        <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.users.map((u, i) => {
              return (
                <TableRow key={i} selected={this.state.selectedRows.indexOf(i) !== -1}>
                  <TableRowColumn>{u.username}</TableRowColumn>
                  <TableRowColumn>{u.name}</TableRowColumn>
                  <TableRowColumn>{u.email}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default UsersListView;
