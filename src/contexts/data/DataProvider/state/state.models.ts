import { FETCH_USER, FETCH_CUSTOMERS, FETCH_INVOICES, FETCH_EXPENSES, FETCH_SETTINGS } from './types';
import { User, Customer, Invoice, Expense, Settings } from '../../data.models';

export interface InitialState {
  user: User;
  settings: Settings;
  customers: Customer[];
  invoices: Invoice[];
  expenses: Expense[];
}

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: User;
}

export interface FetchSettingsAction {
  type: typeof FETCH_SETTINGS;
  payload: Settings;
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

export type Actions = FetchUserAction | FetchSettingsAction | FetchCustomersAction | FetchInvoicesAction | FetchExpensesAction;
