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

export const selectProfile = createSelector(
  selectAuthState,
  (state) => state.profile
)

export const selectProfileName = createSelector(
  selectProfile,
  (profile) => profile?.name || ''
)

export const selectUserId = createSelector(
  selectProfile,
  (profile) => profile?.user_id
)
