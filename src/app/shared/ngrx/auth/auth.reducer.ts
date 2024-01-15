import { createReducer, on } from '@ngrx/store';
import {
  setProfile,
  setSession,
  signup,
  signupFailure,
  signupSuccess,
} from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(signup, (state, {user}) => ({
    ...state,
  })),
  on(signupSuccess, (state) => ({
    ...state,
  })),
  on(signupFailure, (state) => ({
    ...state,
  })),
  on(setSession, (state, {session}) => ({
    ...state,
    session
  })),
  on(setProfile, (state, {profile}) => ({
    ...state,
    profile,
    loading: false
  }))
)
