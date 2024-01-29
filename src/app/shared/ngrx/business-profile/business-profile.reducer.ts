import { createReducer, on } from '@ngrx/store';
import {
  businessProfileAdapter,
  initialBusinessProfileState,
} from './business-profile.state';
import {
  addBusinessProfile, deleteBusinessProfileSuccess, editBusinessProfileSuccess,
  setBusinessProfileById,
  setBusinessProfiles,
} from './business-profile.actions';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';

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
  ),
  on(
    setBusinessProfileById,
    (state, {businessProfile}) => ({
      ...state,
      currentBusinessProfile: businessProfile
    })
  ),
  // on(
  //   successDeleteService,
  //   (state, {id}) => {
  //     const profiles = Object.values(state.entities) as IBusinessProfile[];

  //     const updatedProfiles = profiles.map(profile => {
  //       if (profile && profile.services.some(service => service.id === id)) {
  //         return {
  //           ...profile,
  //           services: profile.services.filter(service => service.id !== id)
  //         };
  //       }
  //       return profile;
  //     });
  
  //     return businessProfileAdapter.setAll(updatedProfiles, {...state, entities: {}});
  //     // const updatedProfiles = Array.from(state?.entities)?.map((profile: IBusinessProfile) => {
  //     //   if (profile && profile.services.some(service => service.id === id)) {
  //     //     return {
  //     //       ...profile,
  //     //       services: profile.services.filter(service => service.id !== id)
  //     //     };
  //     //   }
  //     //   return profile;
  //     // });
  
  //     // return businessProfileAdapter.setAll(updatedProfiles, state);
  //   }
  // )
);
