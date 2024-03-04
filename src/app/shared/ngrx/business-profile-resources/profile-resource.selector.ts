import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  profileResourceAdapter,
  ProfileResourceState,
} from './profile-resource.state';

export const profileResourceFeatureSelector = createFeatureSelector<ProfileResourceState>(
  'profileResource');

const {selectAll} = profileResourceAdapter.getSelectors();

export const profileResourcesSelector = createSelector(
  profileResourceFeatureSelector,
  selectAll,
);

export const currentResourceSelector = createSelector(
  profileResourceFeatureSelector,
  (state) => state.currentProfileResource
)
