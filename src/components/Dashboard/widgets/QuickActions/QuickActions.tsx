import React from 'react';
import StyledElementContainer from '../../../shared/StyledElementContainer/StyledElementContainer';
import { IconButton } from '@material-ui/core';
import { DescriptionRounded, ShoppingCartRounded, SupervisorAccountRounded } from '@material-ui/icons';
import StyledIconsContainer from '../../../shared/StyledIconsContainer/StyledIconsContainer';
import useUI from '../../../../contexts/ui/useUI/useUI';

const QuickActions = () => {
  const { toggleDrawer } = useUI();

  const handleOpenDrawer = (type: 'invoice' | 'customer' | 'expense') => () => toggleDrawer(type);

  return (
    <>
      <StyledElementContainer className="action1">
        <div className="action">
          <StyledIconsContainer>
            <IconButton color="inherit" onClick={handleOpenDrawer('invoice')}>
              <DescriptionRounded className="icon" />
            </IconButton>
          </StyledIconsContainer>
          <p className="title">Add invoice</p>
        </div>
      </StyledElementContainer>
      <StyledElementContainer className="action2">
        <div className="action">
          <StyledIconsContainer>
            <IconButton color="inherit" onClick={handleOpenDrawer('customer')}>
              <SupervisorAccountRounded className="icon" />
            </IconButton>
          </StyledIconsContainer>
          <p className="title">Add customer</p>
        </div>
      </StyledElementContainer>
      <StyledElementContainer className="action3">
        <div className="action">
          <StyledIconsContainer>
            <IconButton color="inherit" onClick={handleOpenDrawer('expense')}>
              <ShoppingCartRounded className="icon" />
            </IconButton>
          </StyledIconsContainer>
          <p className="title">Add expense</p>
        </div>
      </StyledElementContainer>
      <StyledElementContainer className="action4"> Action4 </StyledElementContainer>
    </>
  );
};

export default QuickActions;
