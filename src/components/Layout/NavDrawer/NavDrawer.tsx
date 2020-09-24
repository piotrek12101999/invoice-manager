import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import {
  DashboardRounded,
  SupervisorAccountRounded,
  HistoryRounded,
  SettingsRounded,
  ShoppingCartRounded,
  FileCopyRounded,
  ExitToAppRounded
} from '@material-ui/icons';
import useAuth from '../../../contexts/auth/useAuth/useAuth';
import StyledIconsContainer from '../../shared/StyledIconsContainer/StyledIconsContainer';
import StyledElementContainer from '../../shared/StyledElementContainer/StyledElementContainer';

const routes = [
  { icon: <DashboardRounded className="icon" />, name: '/' },
  { icon: <SupervisorAccountRounded className="icon" />, name: '/customers' },
  { icon: <FileCopyRounded className="icon" />, name: '/invoices' },
  { icon: <ShoppingCartRounded className="icon" />, name: '/expenses' },
  { icon: <HistoryRounded className="icon" />, name: '/history' },
  { icon: <SettingsRounded className="icon" />, name: '/settings' }
];

const NavDrawer: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  useEffect(() => setSelectedRoute(pathname), [pathname]);

  const renderRoutes = () =>
    routes.map(({ icon, name }, index) => (
      <Link to={name} key={index}>
        <StyledIconsContainer className="item">
          <IconButton color={selectedRoute === name ? 'primary' : 'inherit'}>{icon}</IconButton>
        </StyledIconsContainer>
      </Link>
    ));

  return (
    <StyledElementContainer className="styled-nav-drawer">
      <div className="upper-section">
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
