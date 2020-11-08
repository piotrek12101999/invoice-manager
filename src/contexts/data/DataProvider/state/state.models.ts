import { FETCH_USER, FETCH_CUSTOMERS, FETCH_INVOICES, FETCH_EXPENSES } from './types';
import { User, Customer, Invoice, Expense } from '../../data.models';

export interface InitialState {
  user: User;
  customers: Customer[];
  invoices: Invoice[];
  expenses: Expense[];
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

export interface FetchExpensesAction {
  type: typeof FETCH_EXPENSES;
  payload: Expense[];
}

export type Actions = FetchUserAction | FetchCustomersAction | FetchInvoicesAction | FetchExpensesAction;
