import { createContext } from 'react';
import state from '../AuthProvider/state/initialState';

const initialState = {
  ...state,
  signOut: () => {}
};

const AuthContext = createContext(initialState);

export default AuthContext;
