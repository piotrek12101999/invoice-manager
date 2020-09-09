import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { DashboardRounded, SupervisorAccountRounded, HistoryRounded, SettingsRounded, ExitToAppRounded } from '@material-ui/icons';
import useAuth from '../../../contexts/auth/useAuth/useAuth';

const StyledContainer = styled.div`
  background: ${(props) => props.theme.elementsColor};
`;

const StyledIconContainer = styled.div`
  color: ${(props) => props.theme.navIconsColor};
`;

const routes = [
  { icon: <DashboardRounded className="icon" />, name: '/' },
  { icon: <SupervisorAccountRounded className="icon" />, name: '/customers' },
  { icon: <HistoryRounded className="icon" />, name: '/history' },
  { icon: <SettingsRounded className="icon" />, name: '/settings' }
];

interface Props {
  name: string;
  profilePicture: string;
}

const NavDrawer: React.FC<Props> = ({ name, profilePicture }) => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const { signOut } = useAuth();

  useEffect(() => setSelectedRoute(window.location.pathname), []);

  const handleSelectRoute = (route: string) => () => setSelectedRoute(route);

  const renderRoutes = () =>
    routes.map(({ icon, name }, index) => (
      <StyledIconContainer className="item" onClick={handleSelectRoute(name)} key={index}>
        <IconButton color={selectedRoute === name ? 'primary' : 'inherit'}>{icon}</IconButton>
      </StyledIconContainer>
    ));

  return (
    <StyledContainer className="styled-nav-drawer">
      <div className="upper-section">
        <div className="profile">
          <div className="profile-pic" style={{ backgroundImage: `url(${profilePicture})` }} />
          <p className="name"> {name} </p>
        </div>
        <nav className="nav">{renderRoutes()}</nav>
      </div>
      <StyledIconContainer className="logout">
        <IconButton color="inherit" onClick={signOut}>
          <ExitToAppRounded className="icon" />
        </IconButton>
      </StyledIconContainer>
    </StyledContainer>
  );
};

export default NavDrawer;
