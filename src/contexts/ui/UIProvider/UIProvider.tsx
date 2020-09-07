import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, Container } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import UIContext from '../useUI/UIContext';
import GlobalStyles from '../theme/GlobalStyles';
import { themes, createMaterialTheme } from '../theme/theme';
import { ThemeType } from '../ui.models';
import recoverSavedTheme from '../theme/recoverSavedTheme';

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };

const UIProvider: React.FC = ({ children }) => {
  const [theme, setThemeType] = useState<ThemeType>(recoverSavedTheme());

  const setTheme = useCallback((theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    setThemeType(theme);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <UIContext.Provider value={value}>
      <MuiThemeProvider theme={createMaterialTheme(theme)}>
        <StyledThemeProvider theme={{ ...themes[theme], ...themes.global }}>
          <SnackbarProvider anchorOrigin={anchorOrigin}>
            <GlobalStyles theme={{ ...themes[theme], ...themes.global }} />
            <Container> {children} </Container>
          </SnackbarProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </UIContext.Provider>
  );
};

export default UIProvider;
