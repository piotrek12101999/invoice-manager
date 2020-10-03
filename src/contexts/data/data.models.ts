import { InitialState } from './DataProvider/state/state.models';

interface FirestoreDocument {
  id: string;
}

export interface User extends FirestoreDocument {
  NIP: string;
  PKD: string[];
  REGON: string;
  account: string;
  balance: number;
  companyName: string;
  email: string;
  name: string;
  phoneNumber: string;
  primaryPKD: string;
  profilePicture: string;
}

interface CustomerCoreData {
  NIP: string;
  REGON?: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  mailingList: string[];
}

export interface Customer extends FirestoreDocument, CustomerCoreData {}

export interface InvoiceCustomer extends CustomerCoreData {
  id?: string;
}

export interface Product {
  name: string;
  quantity: number;
  netPrice: number;
  VATRate: number;
  grossAmount: number;
}

export interface Details {
  status: string;
  partlyPaid: number;
  paymentDeadling: Date;
  comments: string;
}

export interface Invoice extends FirestoreDocument {
  number: string;
  saleDate: Date;
  issueDate: Date;
  totalPrice: number;
  customer: InvoiceCustomer;
  products: Product[];
  details: Details;
}

export interface InvoiceForm {
  number: string;
  saleDate: Date;
  issueDate: Date;
  totalPrice: number;
  customer: InvoiceCustomer | null;
  products: Product[];
  details: Details | null;
}

export interface DataState extends InitialState {
  fetchData: (email: string) => void;
  unsubscribeData: () => void;
}
