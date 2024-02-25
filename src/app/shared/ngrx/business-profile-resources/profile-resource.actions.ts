import { createAction, props } from '@ngrx/store';
import { IProfileResource } from '../../interfaces/business-profile.interface';

export enum ProfileResourceTypes {
  SET_PROFILE_RESOURCE_LIST = '[Profile Resource] Set profile resource list'
}

export const setProfileResourceList = createAction(
  ProfileResourceTypes.SET_PROFILE_RESOURCE_LIST,
  props<{profileResources: IProfileResource[]}>()
)
