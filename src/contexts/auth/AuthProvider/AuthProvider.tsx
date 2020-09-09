import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../../index';
import initialState from './state/initialState';
import reducer from './state/reducer';
import AuthContext from '../useAuth/AuthContext';
import { SIGN_OUT, SUCCESSFUL_SIGN_IN } from './state/types';
import { useSnackbar } from 'notistack';
import useData from '../../data/useData/useData';

const AuthProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { fetchData, unsubscribeData } = useData();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        fetchData(`${user.email}`);
        dispatch({ type: SUCCESSFUL_SIGN_IN });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    });
  }, [fetchData, enqueueSnackbar]);

  const signOut = useCallback(async () => {
    try {
      unsubscribeData();
      await auth.signOut();
    } catch (err) {
      enqueueSnackbar('Ooops there was a problem, try again', { variant: 'error' });
    }
  }, [unsubscribeData, enqueueSnackbar]);

  const value = useMemo(() => ({ ...state, signOut }), [state, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
