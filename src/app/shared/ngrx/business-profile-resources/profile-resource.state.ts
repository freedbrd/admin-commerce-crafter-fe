import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IProfileResource } from '../../interfaces/business-profile.interface';

export interface ProfileResourceState extends EntityState<IProfileResource> {
  currentProfileResource: IProfileResource;
}

export const profileResourceAdapter: EntityAdapter<IProfileResource> = createEntityAdapter(
  {
    selectId: (data) => data.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });

export const initialProfileResourceState: ProfileResourceState = profileResourceAdapter.getInitialState(
  {
    currentProfileResource: null,
  });
