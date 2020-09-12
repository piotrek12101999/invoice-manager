import React from 'react';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';
import { IconButton } from '@material-ui/core';
import { DescriptionRounded } from '@material-ui/icons';

const QuickActions = () => {
  return (
    <>
      <StyledElementContainer className="action1">
        <div className="action">
          <p className="title">Add invoice</p>
          <IconButton>
            <DescriptionRounded />
          </IconButton>
        </div>
      </StyledElementContainer>
      <StyledElementContainer className="action2"> Action2 </StyledElementContainer>
      <StyledElementContainer className="action3"> Action3 </StyledElementContainer>
      <StyledElementContainer className="action4"> Action4 </StyledElementContainer>
    </>
  );
};

export default QuickActions;
