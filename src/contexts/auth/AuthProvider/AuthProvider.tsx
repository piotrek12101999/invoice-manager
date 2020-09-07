import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../../index';
import initialState from './state/initialState';
import reducer from './state/reducer';
import AuthContext from '../useAuth/AuthContext';
import { SUCCESSFUL_SIGN_IN, SIGN_OUT } from './state/types';

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: SUCCESSFUL_SIGN_IN, payload: { name: 'Piotr Świątek', companyName: 'PS DevSolutions Piotr Świątek' } });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const value = useMemo(() => ({ ...state, signOut }), [state, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
