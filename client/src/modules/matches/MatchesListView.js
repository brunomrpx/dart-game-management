import React, { Component } from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';

import MatchesResource from './MatchesResource';
import CRUDTable from '../../shared/CRUD/CRUDTable';

class MatchesListView extends Component {
  render() {
    return (
      <CRUDTable
        resource={MatchesResource}
        pluralName="matches"
        headers={['Start date', 'Players']}
        onRenderTableRow={(match, index, selected) => {
          return (
            <TableRow key={index} selected={selected}>
              <TableRowColumn>{match.startDate}</TableRowColumn>
              <TableRowColumn>
                {match.players.map((player, index) => {
                  return <p key={index}>{player.data.name}</p>;
                })}
              </TableRowColumn>
            </TableRow>
          )
        }}
      />
    );
  }
}

export default MatchesListView;
