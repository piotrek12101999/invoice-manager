import { InitialState, Actions } from './state.models';
import { FETCH_USER, FETCH_CUSTOMERS, FETCH_INVOICES, FETCH_EXPENSES, FETCH_SETTINGS } from './types';

export default (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_SETTINGS:
      return { ...state, settings: action.payload };
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload };
    case FETCH_INVOICES:
      return { ...state, invoices: action.payload };
    case FETCH_EXPENSES:
      return { ...state, expenses: action.payload };
    default:
      return state;
  }
};
