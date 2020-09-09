import { User } from '../../data.models';
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
  profilePicture: ''
};

const initialState: InitialState = {
  user,
  invoices: [],
  customers: []
};

export default initialState;
