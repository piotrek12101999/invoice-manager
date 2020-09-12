export type ThemeType = 'light' | 'dark';

interface Theme {
  textColor: string;
  secondaryTextColor: string;
  canvasColor: string;
  elementsColor: string;
  navIconsColor: string;
}

interface Global {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface ThemeWithGlobal extends Global, Theme {}

export interface Themes {
  light: Theme;
  dark: Theme;
  global: Global;
}