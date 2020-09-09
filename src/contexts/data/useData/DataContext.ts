import { createContext } from 'react';
import state from '../DataProvider/state/initialState';

const initialState = {
  ...state,
  fetchData: (email: string) => {},
  unsubscribeData: () => {}
};

const DataContext = createContext(initialState);

export default DataContext;
