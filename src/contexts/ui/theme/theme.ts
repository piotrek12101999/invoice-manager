import { createMuiTheme, Theme as MUITheme } from '@material-ui/core';
import { ThemeType, Themes } from '../ui.models';

export const themes: Themes = {
  light: {
    primaryColor: '#0099ff',
    textColor: '#000000de',
    secondaryTextColor: '0000008a',
    canvasColor: '#ffffff'
  },
  dark: {
    primaryColor: '#0099ff',
    textColor: '#ffffff',
    secondaryTextColor: '#ffffffb3',
    canvasColor: '#303030'
  },
  global: {
    fontFamily: 'Roboto'
  }
};

export const createMaterialTheme = (theme: ThemeType): MUITheme => {
  const selectedTheme = themes[theme];

  return createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: selectedTheme.primaryColor
      }
    }
  });
};
