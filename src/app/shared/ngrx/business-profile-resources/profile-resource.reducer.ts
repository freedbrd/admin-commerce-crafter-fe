import { createReducer, on } from '@ngrx/store';
import {
  initialProfileResourceState,
  profileResourceAdapter,
} from './profile-resource.state';
import {
  clearCurrentProfileResource,
  getProfileResourceByIdSuccess, removeProfileResourceSuccess,
  setProfileResourceList,
} from './profile-resource.actions';

export const profileResourceReducer = createReducer(
  initialProfileResourceState,
  on(
    setProfileResourceList,
    (state, {profileResources}) => profileResourceAdapter.setAll(
      profileResources, state),
  ),
  on(
    getProfileResourceByIdSuccess,
    (state, {profileResource}) => ({
      ...state,
      currentProfileResource: profileResource
    })
  ),
  on(
    clearCurrentProfileResource,
    (state) => ({
      ...state,
      currentProfileResource: null
    })
  ),
  on(
    removeProfileResourceSuccess,
    (state, {id}) => profileResourceAdapter.removeOne(id, state)
  )
);
