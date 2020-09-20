import { createContext } from 'react';
import { ThemeType, DrawerType, InitialState } from '../ui.models';
import recoverSavedTheme from '../theme/recoverSavedTheme';

const initialState: InitialState = {
  theme: recoverSavedTheme(),
  drawer: { open: false, type: null, editID: null },
  setTheme: (theme: ThemeType) => {},
  toggleDrawer: (type?: DrawerType, editID?: string) => {}
};

const UIContext = createContext(initialState);

export default UIContext;
