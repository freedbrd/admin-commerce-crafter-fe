import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';

export interface BusinessProfileState extends EntityState<IBusinessProfile> {
  // No additional properties are needed here
}

export const businessProfileAdapter: EntityAdapter<IBusinessProfile> = createEntityAdapter<IBusinessProfile>({
  selectId: (data: IBusinessProfile) => data.id,
  sortComparer: (a: IBusinessProfile, b: IBusinessProfile) => a.name.localeCompare(b.name)
});

export const initialBusinessProfileState: BusinessProfileState = businessProfileAdapter.getInitialState();


// import { IBusinessProfile } from '../../interfaces/business-profile.interface';
// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
//
// export interface BusinessProfileState extends EntityState<IBusinessProfile>{
//   businessProfiles: IBusinessProfile[]
// }
//
// export const businessProfileAdapter: EntityAdapter<IBusinessProfile> = createEntityAdapter({
//   selectId: (data: IBusinessProfile) => data.id,
//   sortComparer: (a: IBusinessProfile, b: IBusinessProfile) => a.name.localeCompare(b.name)
// })
//
// export const initialBusinessProfileState: BusinessProfileState = businessProfileAdapter.getInitialState({
//   businessProfiles: []
// })
