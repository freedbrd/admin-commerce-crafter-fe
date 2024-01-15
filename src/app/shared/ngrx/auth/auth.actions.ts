import { createAction, props } from '@ngrx/store';
import { IProfile, ISignupUser } from '../../interfaces/profile.interface';
import { Session } from '@supabase/supabase-js';

export enum AuthActionTypes {
  SIGNUP = '[Auth] Signup',
  SET_SESSION = '[Auth] Set Session',
  SET_PROFILE = '[Auth] Set Profile',
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  SignupSuccess = '[Auth] SignupSuccess',
  SignupFailure = '[Auth] SignupFailure',
}

export const signup = createAction(
  AuthActionTypes.SIGNUP,
  props<{ user: ISignupUser }>(),
);

export const setSession = createAction(
  AuthActionTypes.SET_SESSION,
  props<{ session: Session | null }>(),
);

export const setProfile = createAction(
  AuthActionTypes.SET_PROFILE,
  props<{ profile: IProfile | null }>(),
);

export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{email: string, password: string}>()
)

export const signupSuccess = createAction(
  AuthActionTypes.SignupSuccess,
);

export const signupFailure = createAction(
  AuthActionTypes.SignupFailure,
  props<{ error: string }>(),
);

export const logout = createAction(
  AuthActionTypes.LOGOUT
)
