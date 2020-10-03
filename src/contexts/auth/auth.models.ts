import { InitialState } from './AuthProvider/state/state.models';

export interface AuthState extends InitialState {
  signOut: () => void;
}
