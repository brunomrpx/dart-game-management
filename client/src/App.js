import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import SocialPeople from 'material-ui/svg-icons/social/people';
import AvGames from 'material-ui/svg-icons/av/games';

import { browserHistory } from 'react-router';

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      menuOpened: false
    };

    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  toggleMenuOpen(value) {
    let state = { menuOpened: value };

    if (typeof value === 'undefined') {
      state = { menuOpened: !this.state.menuOpened };
    }

    this.setState(state)
  }

  goToPage(name) {
    this.toggleMenuOpen(false);
    browserHistory.push(name);
  }

  render() {
    return (
      <div>
        <AppBar
          title="Dart Game"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={ e => this.toggleMenuOpen(true) }
        />
        <Drawer open={this.state.menuOpened} docked={false} onRequestChange={ e => this.toggleMenuOpen(false) }>
          <MenuItem leftIcon={<SocialPeople />} checked={true} onTouchTap={e => this.goToPage('/users') }>Users</MenuItem>
          <MenuItem leftIcon={<AvGames />} onTouchTap={e => this.goToPage('/matches') }>Matches</MenuItem>
        </Drawer>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
};

export default MainLayout;
