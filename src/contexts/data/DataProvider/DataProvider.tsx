import React, { useReducer, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { firestore } from '../../../index';
import DataContext from '../useData/DataContext';
import reducer from './state/reducer';
import initialState from './state/initialState';
import { FETCH_INVOICES, FETCH_CUSTOMERS, FETCH_USER, FETCH_EXPENSES, FETCH_SETTINGS } from './state/types';
import { transformFirestoreData } from './transformFirestoreData';
import { customersCollection, expensesCollection, invoicesCollection, userDoc, settingsDoc } from '../collections';

let unsubscribeUser = () => {};
let unsubscribeSettings = () => {};
let unsubscribeCustomers = () => {};
let unsubscribeInvoices = () => {};
let unsubscribeExpenses = () => {};

const AuthProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(
    (email: string) => {
      const subscribeUser = (email: string) => {
        unsubscribeUser = firestore.doc(userDoc(email)).onSnapshot(
          (snapshot) => {
            const data = snapshot.data();
            // @ts-ignore
            dispatch({ type: FETCH_USER, payload: { ...data, email } });
          },
          () => enqueueSnackbar('Error while fetching user', { variant: 'error' })
        );
      };

      const subscribeSettings = (email: string) => {
        unsubscribeSettings = firestore.doc(settingsDoc(email)).onSnapshot(
          (snapshot) => {
            const data = snapshot.data();
            // @ts-ignore
            dispatch({ type: FETCH_SETTINGS, payload: data });
          },
          () => enqueueSnackbar('Error while fetching settings', { variant: 'error' })
        );
      };

      const subscribeCustomers = (email: string) => {
        unsubscribeCustomers = firestore
          .collection(customersCollection(email))
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
          .collection(invoicesCollection(email))
          .orderBy('saleDate', 'desc')
          .onSnapshot(
            ({ docs }) => {
              // @ts-ignore
              dispatch({ type: FETCH_INVOICES, payload: transformFirestoreData(docs) });
            },
            () => enqueueSnackbar('Error while fetching invoices', { variant: 'error' })
          );
      };

      const subscribeExpenses = (email: string) => {
        unsubscribeExpenses = firestore
          .collection(expensesCollection(email))
          .orderBy('purchaseDate', 'desc')
          .onSnapshot(
            ({ docs }) => {
              // @ts-ignore
              dispatch({ type: FETCH_EXPENSES, payload: transformFirestoreData(docs) });
            },
            () => enqueueSnackbar('Error while fetching expenses', { variant: 'error' })
          );
      };

      subscribeUser(email);
      subscribeSettings(email);
      subscribeCustomers(email);
      subscribeInvoices(email);
      subscribeExpenses(email);
    },
    [enqueueSnackbar]
  );

  const unsubscribeData = useCallback(() => {
    unsubscribeUser();
    unsubscribeSettings();
    unsubscribeCustomers();
    unsubscribeInvoices();
    unsubscribeExpenses();
  }, []);

  const value = useMemo(() => ({ ...state, fetchData, unsubscribeData }), [state, fetchData, unsubscribeData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default AuthProvider;
