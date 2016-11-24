import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';

import CRUDActionButtons from './CRUDActionButtons';

class CRUDTable extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
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
    this.removeSelectedEntries = this.removeSelectedEntries.bind(this);
    this.loadEntries = this.loadEntries.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
  }

  goToPage(page) {
    browserHistory.push(page);
  }

  handleRowSelection(selectedRows) {
    let newState = this.getActionState(selectedRows);
    this.setState(newState);
  }

  removeSelectedEntries(e) {
    let selectedRows = this.state.selectedRows;
    let entries = this.state.entries;

    let ids = [];

    if (selectedRows === 'all') {
      ids = entries.map(u => u._id);
    } else {
      ids = selectedRows.map(i => entries[i]._id);
    }

    ids = ids.join(',');

    this.props.resource.delete(ids).then(() => {
      this.setState({
        canRemove: false,
        canEdit: false,
        selectedRows: []
      });
    })
    .then(this.loadEntries)
    .then(() => {
      this.setState({
        message: { show: true, text: 'Entries successfully removed' }
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

  loadEntries() {
    console.log('-> loading entries: ', this.props.resource);
    this.props.resource.getAll().then(result => {
      this.setState({ entries: result[this.props.pluralName] });
    });
  }

  componentDidMount() {
    this.loadEntries();
  }

  resetMessage() {
    this.setState({
      message: { show: false, text: '' }
    });
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.message.show}
          message={this.state.message.text}
          autoHideDuration={4000}
          onRequestClose={this.resetMessage}
        />
        <CRUDActionButtons
          canEdit={this.state.canEdit}
          canRemove={this.state.canRemove}
          onCLickEditButton={e => this.goToPage(`/${this.props.pluralName}/edit/${this.state.entries[this.state.selectedRows[0]]._id}`)}
          onClickCreateButton={e => this.goToPage(`/${this.props.pluralName}/new`)}
          onClickDeleteButton={this.removeSelectedEntries}
          createAction={this.props.createAction}
          deleteAction={this.props.deleteAction}
          editAction={this.props.editAction}
        />
        <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              {this.props.headers.map((h, i) => {
                return <TableHeaderColumn key={i}>{h}</TableHeaderColumn>
              })}
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.entries.map((entry, index) => {
              return this.props.onRenderTableRow(entry, index, this.state.selectedRows.indexOf(index) !== -1);
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

CRUDTable.defaultProps = {
  resource: null,
  pluralName: '',
  headers: [],
  onRenderTableRow: null,
  createAction: true,
  deleteAction: true,
  editAction: true
};

export default CRUDTable;
