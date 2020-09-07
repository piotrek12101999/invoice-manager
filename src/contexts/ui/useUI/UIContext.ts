import { createContext } from 'react';
import { ThemeType } from '../ui.models';
import recoverSavedTheme from '../theme/recoverSavedTheme';

const initialState = {
  theme: recoverSavedTheme(),
  setTheme: (theme: ThemeType) => {}
};

const UIContext = createContext(initialState);

export default UIContext;
