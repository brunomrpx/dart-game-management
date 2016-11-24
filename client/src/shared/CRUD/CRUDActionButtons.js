import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { red500, blue500 } from 'material-ui/styles/colors';

import CRUDActionButtonsContainer from './CRUDActionButtonsContainer';

const CRUDActionButtons = props => {
  const buttonStyle = {
    marginTop: 15
  }

  var buttons = [];

  if (props.createAction) {
    buttons.push(
      <FloatingActionButton style={buttonStyle} onClick={props.onClickCreateButton}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  if (props.editAction) {
    buttons.push(
      <FloatingActionButton style={buttonStyle} backgroundColor={red500} disabled={!props.canRemove} onClick={props.onClickDeleteButton}>
        <ContentRemove />
      </FloatingActionButton>
    );
  }

  if (props.deleteAction) {
    buttons.push(
      <FloatingActionButton style={buttonStyle} backgroundColor={blue500} disabled={!props.canEdit} onClick={props.onClickDeleteButton}>
        <ContentCreate />
      </FloatingActionButton>
    );
  }

  return (
    <CRUDActionButtonsContainer>
      {buttons.map((button, index) => <div key={index}>{button}</div>)}
    </CRUDActionButtonsContainer>
  );
}

CRUDActionButtons.defaultProps = {
  createAction: true,
  deleteAction: true,
  editAction: true,
  canRemove: false,
  canEdit: false,
  onClickCreateButton: null,
  onClickDeleteButton: null,
  onCLickEditButton: null
};

export default CRUDActionButtons;
