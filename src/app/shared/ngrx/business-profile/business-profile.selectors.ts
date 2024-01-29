import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  businessProfileAdapter,
  BusinessProfileState,
} from './business-profile.state';

export const businessProfileState = createFeatureSelector<BusinessProfileState>('businessProfiles');

const {selectAll} = businessProfileAdapter.getSelectors()

export const businessProfileSelector = createSelector(
  businessProfileState,
  selectAll
)

export const currentBusinessProfile = createSelector(
  businessProfileState,
  (state) => state.currentBusinessProfile
)

export const currentBusinessProfileName = createSelector(
  currentBusinessProfile,
  (businessProfile) => businessProfile?.name || ''
)

export const businessProfileServices = createSelector(
  currentBusinessProfile,
  (businessProfile) => businessProfile?.services || []
)