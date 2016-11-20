import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { red500, blue500 } from 'material-ui/styles/colors';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Snackbar from 'material-ui/Snackbar';

import MatchesResource from './MatchesResource';

import CRUDTable from '../../shared/CRUDTable';

class MatchesListView extends Component {
  render() {
    return (
      <CRUDTable resource={MatchesResource} pluralName="matches" headers={['Start date', 'Players']} />
    );
  }
}

export default MatchesListView;
