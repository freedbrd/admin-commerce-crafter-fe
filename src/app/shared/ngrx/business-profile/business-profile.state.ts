import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';

export interface BusinessProfileState extends EntityState<IBusinessProfile> {
  currentBusinessProfile: IBusinessProfile | null
}

export const businessProfileAdapter: EntityAdapter<IBusinessProfile> = createEntityAdapter<IBusinessProfile>({
  selectId: (data: IBusinessProfile) => data.id,
  sortComparer: (a: IBusinessProfile, b: IBusinessProfile) => a.name.localeCompare(b.name),
});

export const initialBusinessProfileState: BusinessProfileState = businessProfileAdapter.getInitialState({
  currentBusinessProfile: null
});
