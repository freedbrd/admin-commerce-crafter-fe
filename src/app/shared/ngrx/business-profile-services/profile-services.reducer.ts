import { createReducer, on } from '@ngrx/store';
import {
  initialProfileServiceState,
  profileServiceAdapter,
} from './profile-services.state';
import {
  clearSelectedService,
  deleteServiceSuccess, getServiceByIdSuccess,
  setProfileServices,
} from './profile-services.actions';

export const profileServicesReducer = createReducer(
  initialProfileServiceState,
  on(
    setProfileServices,
    (state, {profileServices}) => profileServiceAdapter.setAll(profileServices,
      state),
  ),
  on(
    deleteServiceSuccess,
    (state, {profileService}) => profileServiceAdapter.removeOne(
      profileService?.id, state),
  ),
  on(
    getServiceByIdSuccess,
    (state, {service}) => ({
      ...state,
      currentBusinessProfileService: service
    })
  ),
  on(
    clearSelectedService,
    (state) => ({
      ...state,
      currentBusinessProfileService: null
    })
  )
);
