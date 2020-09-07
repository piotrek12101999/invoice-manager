import { SUCCESSFUL_SIGN_IN, UNSUCCESSFUL_SIGN_IN, SIGN_OUT } from './types';
import { User } from '../../auth.models';

export interface InitialState {
  isSignedIn: boolean;
  isDataLoading: boolean;
  user: User;
}

export interface SuccessfulSignInAction {
  type: typeof SUCCESSFUL_SIGN_IN;
  payload: User;
}

export interface UnsuccessfulSignInAction {
  type: typeof UNSUCCESSFUL_SIGN_IN;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type Actions = SuccessfulSignInAction | UnsuccessfulSignInAction | SignOutAction;
