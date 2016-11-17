import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import UsersListView from './modules/users/UsersListView';
import UsersFormView from './modules/users/UsersFormView';
import Matches from './modules/matches/Matches';

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={UsersListView} />
        <Route path='users'>
          <IndexRoute component={UsersListView} />
          <Route path='new' component={UsersFormView} />
          <Route path='edit/:id' component={UsersFormView} />
        </Route>
        <Route path='matches' component={Matches} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
