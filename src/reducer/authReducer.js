import * as types from '../actions/types';

const initialState = {
  isSigningUp: false,
  isSigningIn: false,
  signUpError: null,
  signInError: null,
  currentUser: null
};

function authReducer (prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SIGNUP_REQUEST:
      newState.isSigningUp = true;
      break;

    case types.SIGNUP_ERROR:
      newState.isSigningUp = false;
      newState.signUpError = action.err;
      break;

    case types.SIGNUP_SUCCESS:
      newState.isSigningUp = false;
      newState.currentUser = action.user;
      break;

    case types.SIGNIN_REQUEST:
      newState.isSigningIn = true;
      break;

    case types.SIGNIN_ERROR:
      newState.isSigningIn = false;
      newState.signInError = action.err;
      break;

    case types.SIGNIN_SUCCESS:
      newState.isSigningIn = false;
      newState.currentUser = action.user;
      break;

    case types.SET_USER:
      newState.currentUser = action.user;
      break;

    case types.SIGN_OUT:
      newState.currentUser = null;
      break;

    default:
      return prevState;
  }

  return newState;
}

export default authReducer;
