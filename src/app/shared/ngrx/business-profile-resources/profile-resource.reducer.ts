import { createReducer, on } from '@ngrx/store';
import {
  initialProfileResourceState,
  profileResourceAdapter,
} from './profile-resource.state';
import { setProfileResourceList } from './profile-resource.actions';

export const profileResourceReducer = createReducer(
  initialProfileResourceState,
  on(
    setProfileResourceList,
    (state, {profileResources}) => profileResourceAdapter.setAll(
      profileResources, state),
  ),
);
