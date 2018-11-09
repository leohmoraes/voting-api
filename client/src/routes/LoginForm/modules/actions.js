import {
  SIGN_IN_INIT,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
} from './types';

export const signInInit = payload => ({
  type: SIGN_IN_INIT,
  payload,
});

export const signInSuccess = payload => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const signInError = payload => ({
  type: SIGN_IN_ERROR,
  payload,
});

export const signOut = () => ({
  type: SIGN_OUT,
});