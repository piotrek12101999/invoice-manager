import { InitialState, Actions } from './state.models';
import { SUCCESSFUL_SIGN_IN, UNSUCCESSFUL_SIGN_IN, SIGN_OUT } from './types';

export default (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case SUCCESSFUL_SIGN_IN:
      return { ...state, isSignedIn: true, isDataLoading: false };
    case UNSUCCESSFUL_SIGN_IN:
      return { ...state, isSignedIn: false, isDataLoading: false };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, isDataLoading: false };
    default:
      return state;
  }
};
