export type ThemeType = 'light' | 'dark';

interface Theme {
  primaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  canvasColor: string;
}

interface Global {
  fontFamily: string;
}

export interface ThemeWithGlobal extends Global, Theme {}

export interface Themes {
  light: Theme;
  dark: Theme;
  global: Global;
}
