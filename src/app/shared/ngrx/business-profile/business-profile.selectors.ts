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
