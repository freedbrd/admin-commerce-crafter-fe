import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState  = createFeatureSelector<AuthState>('auth')

export const selectSession = createSelector(
  selectAuthState ,
  (state) => state.session
)

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
)
