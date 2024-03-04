import { createAction, props } from '@ngrx/store';
import { IProfileResource } from '../../interfaces/business-profile.interface';

export enum ProfileResourceTypes {
  SET_PROFILE_RESOURCE_LIST = '[Profile Resource] Set profile resource list',
  CREATE_PROFILE_RESOURCE_REQUEST = '[Profile Resource] Create profile resource request',
  GET_PROFILE_RESOURCE_BY_ID = '[Profile Resource] Get profile resource by id',
  GET_PROFILE_RESOURCE_BY_ID_SUCCESS = '[Profile Resource] Get profile resource by id Success',
  EDIT_PROFILE_RESOURCE_SUCCESS = '[Profile Resource] Edit Profile resource',
  CLEAR_CURRENT_PROFILE_RESOURCE_SUCCESS = '[Profile Resource] Clear Current Profile resource',
  REMOVE_PROFILE_RESOURCE_REQUEST = '[Profile Resource] Remove Profile resource',
  REMOVE_PROFILE_RESOURCE_SUCCESS = '[Profile Resource] Remove Profile resource success',
}

export const setProfileResourceList = createAction(
  ProfileResourceTypes.SET_PROFILE_RESOURCE_LIST,
  props<{profileResources: IProfileResource[]}>()
)

export const createProfileResourceRequest = createAction(
  ProfileResourceTypes.CREATE_PROFILE_RESOURCE_REQUEST,
  props<{profileResources: IProfileResource}>()
)

export const getProfileResourceByIdRequest = createAction(
  ProfileResourceTypes.GET_PROFILE_RESOURCE_BY_ID,
  props<{id: string}>()
)

export const getProfileResourceByIdSuccess = createAction(
  ProfileResourceTypes.GET_PROFILE_RESOURCE_BY_ID_SUCCESS,
  props<{profileResource: IProfileResource}>()
)

export const editProfileResourceRequest = createAction(
  ProfileResourceTypes.EDIT_PROFILE_RESOURCE_SUCCESS,
  props<{profileResource: IProfileResource}>()
)

export const clearCurrentProfileResource = createAction(
  ProfileResourceTypes.CLEAR_CURRENT_PROFILE_RESOURCE_SUCCESS
)

export const removeProfileResourceRequest = createAction(
  ProfileResourceTypes.REMOVE_PROFILE_RESOURCE_REQUEST,
  props<{id: string}>()
)

export const removeProfileResourceSuccess = createAction(
  ProfileResourceTypes.REMOVE_PROFILE_RESOURCE_SUCCESS,
  props<{id: string}>()
)
