import { Settings, User } from '../../data.models';
import { InitialState } from './state.models';

const user: User = {
  NIP: '',
  PKD: [],
  REGON: '',
  account: '',
  companyName: '',
  email: '',
  name: '',
  phoneNumber: '',
  primaryPKD: '',
  profilePicture: '',
  street: '',
  postalCode: '',
  city: ''
};

const settings: Settings = {
  mailing: {
    enabled: false,
    list: []
  },
  notifications: {
    enabled: false,
    expenses: false,
    invoices: false
  }
};

const initialState: InitialState = {
  user,
  settings,
  invoices: [],
  customers: [],
  expenses: []
};

export default initialState;
