import { SUCCESSFUL_SIGN_IN, UNSUCCESSFUL_SIGN_IN, SIGN_OUT } from './types';

export interface InitialState {
  isSignedIn: boolean;
  isDataLoading: boolean;
}

export interface SuccessfulSignInAction {
  type: typeof SUCCESSFUL_SIGN_IN;
}

export interface UnsuccessfulSignInAction {
  type: typeof UNSUCCESSFUL_SIGN_IN;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type Actions = SuccessfulSignInAction | UnsuccessfulSignInAction | SignOutAction;
