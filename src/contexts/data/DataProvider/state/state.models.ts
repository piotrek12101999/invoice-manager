import { FETCH_USER, FETCH_CUSTOMERS, FETCH_INVOICES } from './types';
import { User, Customer, Invoice } from '../../data.models';

export interface InitialState {
  user: User;
  customers: Customer[];
  invoices: Invoice[];
}

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: User;
}

export interface FetchCustomersAction {
  type: typeof FETCH_CUSTOMERS;
  payload: Customer[];
}

export interface FetchInvoicesAction {
  type: typeof FETCH_INVOICES;
  payload: Invoice[];
}

export type Actions = FetchUserAction | FetchCustomersAction | FetchInvoicesAction;
