import { User } from '../../data.models';
import { InitialState } from './state.models';

const user: User = {
  id: '',
  NIP: '',
  PKD: [],
  REGON: '',
  account: '',
  balance: 0,
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

const initialState: InitialState = {
  user,
  invoices: [],
  customers: []
};

export default initialState;
