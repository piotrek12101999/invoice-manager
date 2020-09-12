import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { DashboardRounded, SupervisorAccountRounded, HistoryRounded, SettingsRounded, ExitToAppRounded } from '@material-ui/icons';
import useAuth from '../../../contexts/auth/useAuth/useAuth';
import StyledIconsContainer from '../../shared/StyledIconsContainer/StyledIconsContainer';
import StyledElementContainer from '../../shared/StyledElementContainer/StyledElementContainer';

const routes = [
  { icon: <DashboardRounded className="icon" />, name: '/' },
  { icon: <SupervisorAccountRounded className="icon" />, name: '/customers' },
  { icon: <HistoryRounded className="icon" />, name: '/history' },
  { icon: <SettingsRounded className="icon" />, name: '/settings' }
];

const NavDrawer: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const { signOut } = useAuth();

  useEffect(() => setSelectedRoute(window.location.pathname), []);

  const handleSelectRoute = (route: string) => () => setSelectedRoute(route);

  const renderRoutes = () =>
    routes.map(({ icon, name }, index) => (
      <StyledIconsContainer className="item" onClick={handleSelectRoute(name)} key={index}>
        <IconButton color={selectedRoute === name ? 'primary' : 'inherit'}>{icon}</IconButton>
      </StyledIconsContainer>
    ));

  return (
    <StyledElementContainer className="styled-nav-drawer">
      <div className="upper-section">
        <div className="test" />
        <nav className="nav">{renderRoutes()}</nav>
      </div>
      <StyledIconsContainer className="logout">
        <IconButton color="inherit" onClick={signOut}>
          <ExitToAppRounded className="icon" />
        </IconButton>
      </StyledIconsContainer>
    </StyledElementContainer>
  );
};

export default NavDrawer;
