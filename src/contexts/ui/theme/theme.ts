import { createMuiTheme, Theme as MUITheme } from '@material-ui/core';
import { ThemeType, Themes } from '../ui.models';

export const themes: Themes = {
  light: {
    primaryColor: '#0099ff',
    textColor: '#000000de',
    secondaryTextColor: '0000008a',
    canvasColor: '#f0f1f6',
    elementsColor: '#ffffff',
    navIconsColor: '#b9c0de'
  },
  dark: {
    primaryColor: '#0099ff',
    textColor: '#ffffff',
    secondaryTextColor: '#ffffffb3',
    canvasColor: '#18191a',
    elementsColor: '#252526',
    navIconsColor: '#e4e6eb'
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
