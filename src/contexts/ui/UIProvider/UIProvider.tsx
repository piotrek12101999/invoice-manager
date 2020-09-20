import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import UIContext from '../useUI/UIContext';
import GlobalStyles from '../theme/GlobalStyles';
import { themes, createMaterialTheme } from '../theme/theme';
import { ThemeType, Drawer, DrawerType } from '../ui.models';
import recoverSavedTheme from '../theme/recoverSavedTheme';

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };

const UIProvider: React.FC = ({ children }) => {
  const [theme, setThemeType] = useState<ThemeType>(recoverSavedTheme());
  const [drawer, setDrawer] = useState<Drawer>({ open: false, type: null, editID: null });

  const setTheme = useCallback((theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    setThemeType(theme);
  }, []);

  const toggleDrawer = useCallback((type?: DrawerType, editID?: string) => {
    setDrawer((prevState) => ({ ...prevState, open: !prevState.open, ...(type && { type }), ...(editID && { editID }) }));
  }, []);

  const value = useMemo(() => ({ theme, drawer, setTheme, toggleDrawer }), [theme, drawer, setTheme, toggleDrawer]);

  return (
    <UIContext.Provider value={value}>
      <MuiThemeProvider theme={createMaterialTheme(theme)}>
        <StyledThemeProvider theme={{ ...themes[theme], ...themes.global }}>
          <SnackbarProvider anchorOrigin={anchorOrigin}>
            <GlobalStyles theme={{ ...themes[theme], ...themes.global }} />
            {children}
          </SnackbarProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </UIContext.Provider>
  );
};

export default UIProvider;
