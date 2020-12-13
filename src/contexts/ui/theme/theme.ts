import { createMuiTheme, Theme as MUITheme } from '@material-ui/core';
import { ThemeType, Themes } from '../ui.models';

export const themes: Themes = {
  light: {
    textColor: '#000000de',
    secondaryTextColor: '0000008a',
    canvasColor: '#f0f1f6',
    elementsColor: '#ffffff',
    navIconsColor: '#b9c0de'
  },
  dark: {
    textColor: '#ffffff',
    secondaryTextColor: '#ffffffb3',
    canvasColor: '#18191a',
    elementsColor: '#252526',
    navIconsColor: '#e4e6eb'
  },
  global: {
    primaryColor: '#0099ff',
    secondaryColor: '#f46f2c',
    fontFamily: 'Roboto'
  }
};

export const createMaterialTheme = (theme: ThemeType): MUITheme =>
  createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: themes.global.primaryColor
      },
      secondary: {
        main: themes.global.secondaryColor
      }
    },
    overrides: {
      MuiDrawer: {
        paper: {
          background: themes[theme].elementsColor,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20
        }
      },
      MuiDialog: {
        paper: {
          background: themes[theme].elementsColor,
          borderRadius: 20
        }
      },
      MuiButton: {
        root: {
          borderRadius: 20
        }
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 12
        }
      },
      MuiAccordion: {
        root: {
          '&$expanded': {
            margin: 'unset'
          },
          '&::before': {
            background: 'transparent'
          },
          background: theme === 'dark' ? '#252526' : '#ffffff',
          boxShadow: 'unset'
        }
      },
      MuiAccordionDetails: {
        root: {
          padding: 'unset'
        }
      }
    }
  });
