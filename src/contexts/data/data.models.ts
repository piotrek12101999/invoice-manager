import { InitialState } from './DataProvider/state/state.models';

interface FirestoreDocument {
  id: string;
}

export interface User {
  NIP: string;
  PKD: string[];
  REGON: string;
  account: string;
  companyName: string;
  email: string;
  name: string;
  phoneNumber: string;
  primaryPKD: string;
  profilePicture: string;
  street: string;
  city: string;
  postalCode: string;
}
export interface Settings {
  mailing: {
    enabled: boolean;
    list: string[];
  };
  notifications: {
    enabled: boolean;
    expenses: boolean;
    invoices: boolean;
  };
}

interface CustomerCoreData {
  NIP: string;
  REGON?: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  mail?: string;
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
  status?: string;
  partlyPaid?: number;
  paymentDeadline?: Date;
  comments?: string;
}

export interface Invoice extends FirestoreDocument {
  number: string;
  saleDate: Date;
  issueDate: Date;
  totalPrice: number;
  customer: InvoiceCustomer;
  products: Product[];
  details?: Details;
  isGeneratedPDF: boolean;
}

export interface Expense extends FirestoreDocument {
  name: string;
  price: number;
  purchaseDate: Date;
  file?: {
    name: string;
    size: number;
  };
}

export interface DataState extends InitialState {
  fetchData: (email: string) => void;
  unsubscribeData: () => void;
}
