import { createAction, props } from '@ngrx/store';
import { IProfileService } from '../../interfaces/business-profile.interface';

export enum ProfileServiceActionTypes {
  DELETE_SERVICE_REQUEST = '[Profiles Services] Delete Services Request',
  SET_PROFILE_SERVICES = '[Profiles Services] Set profile Services',
  DELETE_PROFILE_SERVICE_SUCCESS = '[Profiles Services] Delete Services Success',
  CREATE_PROFILE_SERVICE_REQUEST = '[Profiles Services] Create Services Request',
  EDIT_PROFILE_SERVICE_REQUEST = '[Profiles Services] Edit Services Request',
  CREATE_PROFILE_SERVICE_SUCCESS = '[Profiles Services] Create Services Success',
  GET_PROFILE_SERVICE_BY_ID_REQUEST = '[Profiles Services] Get Service By Id Request',
  GET_PROFILE_SERVICE_BY_ID_SUCCESS = '[Profiles Services] Get Service By Id Success',
  CLEAR_PROFILE_SERVICE = '[Profile Service] Clear Selected Service',
  DELETE_SERVICE_IMAGES = '[Profile Service] Delete Service Images'
}

export const deleteServiceImages = createAction(
  ProfileServiceActionTypes.DELETE_SERVICE_IMAGES,
  props<{ imagesToDelete: string[] }>()
)

export const setProfileServices = createAction(
  ProfileServiceActionTypes.SET_PROFILE_SERVICES,
  props<{ profileServices: IProfileService[] }>(),
);

export const deleteServiceRequest = createAction(
  ProfileServiceActionTypes.DELETE_SERVICE_REQUEST,
  props<{ profileServices: IProfileService }>(),
);

export const deleteServiceSuccess = createAction(
  ProfileServiceActionTypes.DELETE_PROFILE_SERVICE_SUCCESS,
  props<{ profileServices: IProfileService }>(),
);

export const editServiceRequest = createAction(
  ProfileServiceActionTypes.EDIT_PROFILE_SERVICE_REQUEST,
  props<{
    profileServices: IProfileService,
    mainImage: Blob,
    showCasesImages: Blob[],
    imagesToDelete: string[]
  }>(),
);

export const createServiceRequest = createAction(
  ProfileServiceActionTypes.CREATE_PROFILE_SERVICE_REQUEST,
  props<{
    profileServices: IProfileService,
    mainImage: Blob,
    showCasesImages: Blob[]
  }>(),
);

export const createServiceSuccess = createAction(
  ProfileServiceActionTypes.CREATE_PROFILE_SERVICE_SUCCESS,
  props<{ profileServices: IProfileService }>(),
);

export const getServiceByIdRequest = createAction(
  ProfileServiceActionTypes.GET_PROFILE_SERVICE_BY_ID_REQUEST,
  props<{ id: string }>(),
);

export const getServiceByIdSuccess = createAction(
  ProfileServiceActionTypes.GET_PROFILE_SERVICE_BY_ID_SUCCESS,
  props<{ service: IProfileService }>(),
);

export const clearSelectedService = createAction(
  ProfileServiceActionTypes.CLEAR_PROFILE_SERVICE,
);
