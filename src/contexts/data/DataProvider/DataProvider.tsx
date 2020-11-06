import React, { useReducer, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { firestore } from '../../../index';
import DataContext from '../useData/DataContext';
import reducer from './state/reducer';
import initialState from './state/initialState';
import { FETCH_INVOICES, FETCH_CUSTOMERS, FETCH_USER } from './state/types';
import { transformFirestoreData } from './transformFirestoreData';

let unsubscribeUser = () => {};
let unsubscribeCustomers = () => {};
let unsubscribeInvoices = () => {};

const AuthProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(
    (email: string) => {
      const subscribeUser = (email: string) => {
        unsubscribeUser = firestore.doc(`${email}/data`).onSnapshot(
          (snapshot) => {
            const data = snapshot.data();
            // @ts-ignore
            dispatch({ type: FETCH_USER, payload: { ...data, email } });
          },
          () => enqueueSnackbar('Error while fetching user', { variant: 'error' })
        );
      };

      const subscribeCustomers = (email: string) => {
        unsubscribeCustomers = firestore
          .collection(`${email}/customers/customers`)
          .orderBy('name', 'asc')
          .onSnapshot(
            ({ docs }) => {
              // @ts-ignore
              dispatch({ type: FETCH_CUSTOMERS, payload: transformFirestoreData(docs) });
            },
            () => enqueueSnackbar('Error while fetching customers', { variant: 'error' })
          );
      };

      const subscribeInvoices = (email: string) => {
        unsubscribeInvoices = firestore
          .collection(`${email}/invoices/invoices`)
          .orderBy('saleDate', 'desc')
          .onSnapshot(
            ({ docs }) => {
              // @ts-ignore
              dispatch({ type: FETCH_INVOICES, payload: transformFirestoreData(docs) });
            },
            () => enqueueSnackbar('Error while fetching invoices', { variant: 'error' })
          );
      };

      subscribeUser(email);
      subscribeCustomers(email);
      subscribeInvoices(email);
    },
    [enqueueSnackbar]
  );

  const unsubscribeData = useCallback(() => {
    unsubscribeUser();
    unsubscribeCustomers();
    unsubscribeInvoices();
  }, []);

  const value = useMemo(() => ({ ...state, fetchData, unsubscribeData }), [state, fetchData, unsubscribeData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default AuthProvider;
