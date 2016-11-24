import React from 'react';

const CRUDActionButtonsContainer = props => {
  const buttonsContainerStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    width: 56,
    position: 'fixed',
  };

  return (
    <div style={buttonsContainerStyle}>
      {props.children}
    </div>
  );
};

export default CRUDActionButtonsContainer;
