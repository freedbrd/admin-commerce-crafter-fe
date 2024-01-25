import { createReducer, on } from '@ngrx/store';
import {
  businessProfileAdapter,
  initialBusinessProfileState,
} from './business-profile.state';
import {
  addBusinessProfile, deleteBusinessProfileSuccess, editBusinessProfileSuccess,
  setBusinessProfiles,
} from './business-profile.actions';

export const businessProfileReducer = createReducer(
  initialBusinessProfileState,
  on(setBusinessProfiles, (state, {businessProfiles}) => businessProfileAdapter.setAll(businessProfiles, state)),
  on(addBusinessProfile,
    (state, {businessProfile}) => businessProfileAdapter.addOne(businessProfile,
      state)),
  on(
    deleteBusinessProfileSuccess,
    (state, {businessProfile}) => businessProfileAdapter.removeOne(businessProfile.id, state)
  ),
  on(
    editBusinessProfileSuccess,
    (state, {businessProfile}) => businessProfileAdapter.upsertOne(businessProfile, state)
  )
);
