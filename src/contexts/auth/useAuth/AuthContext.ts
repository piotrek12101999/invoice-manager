import { createContext } from 'react';
import { AuthState } from '../auth.models';

const AuthContext = createContext({} as AuthState);

export default AuthContext;
