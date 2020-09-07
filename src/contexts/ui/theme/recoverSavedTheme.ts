import { ThemeType } from '../ui.models';

const recoverSavedTheme = (): ThemeType => {
  const theme: string | null = window.localStorage.getItem('theme');

  return theme === 'dark' ? 'dark' : 'light';
};

export default recoverSavedTheme;
