import { InitialState, Actions } from './state.models';
import { FETCH_USER, FETCH_CUSTOMERS, FETCH_INVOICES } from './types';

export default (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload };
    case FETCH_INVOICES:
      return { ...state, invoices: action.payload };
    default:
      return state;
  }
};
