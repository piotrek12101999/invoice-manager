import React from 'react';
import styled from 'styled-components';
import { TextField, InputAdornment, IconButton, Badge } from '@material-ui/core';
import { SearchRounded, NotificationsRounded, Brightness7Rounded, Brightness4Rounded } from '@material-ui/icons';
import useUI from '../../../contexts/ui/useUI/useUI';
import StyledIconsContainer from '../../shared/StyledIconsContainer/StyledIconsContainer';

const StyledHeader = styled.header`
  background: ${(props) => props.theme.elementsColor};
`;

interface Props {
  profilePicture: string;
}

const Header: React.FC<Props> = ({ profilePicture }) => {
  const { theme, setTheme } = useUI();

  const handleThemeChange = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <StyledHeader className="header">
      <div className="left-section">
        <div className="profile-picture" style={{ backgroundImage: `url(${profilePicture})` }} />
        <TextField
          className="input"
          size="small"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            style: { borderRadius: 8 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            )
          }}
        />
      </div>
      <StyledIconsContainer className="right-section">
        <IconButton color="inherit">
          <Badge color="secondary" variant="dot">
            <NotificationsRounded className="icon" />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleThemeChange}>
          {theme === 'light' ? <Brightness4Rounded className="icon" /> : <Brightness7Rounded className="icon" />}
        </IconButton>
      </StyledIconsContainer>
    </StyledHeader>
  );
};

export default Header;
