import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import Users from './components/Users';
import Matches from './components/Matches';

import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Users} />
        <Route path='users' component={Users} />
        <Route path='matches' component={Matches} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
