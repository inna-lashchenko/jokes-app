import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import {AuthState} from '../store.interface';
import {User} from '../../models/user.model';


const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};


const reducer = createReducer(
  initialState,

  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state: AuthState) => ({
      ...state,
      authError: null,
      loading: true
    })
  ),

  on(
    AuthActions.authenticateSuccess,
    (state: AuthState, action) => ({
      ...state,
      authError: null,
      loading: false,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      )
    })
  ),

  on(
    AuthActions.authenticateFail,
    (state: AuthState, action) => ({
      ...state,
      user: null,
      authError: action.errorMessage,
      loading: false
    })
  ),

  on(
    AuthActions.logout,
    (state: AuthState) => ({
      ...state,
      user: null
    })
  ),

  on(
    AuthActions.clearError,
    (state: AuthState) => ({
      ...state,
      authError: null
    })
  ),

);


export function authReducer(state: AuthState, action: Action) {
  return reducer(state, action);
}
