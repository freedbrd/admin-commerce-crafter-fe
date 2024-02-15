import { createAction, props } from "@ngrx/store";
import { IProfileService } from "../../interfaces/business-profile.interface";

export enum ProfileServiceActionTypes {
    DELETE_SERVICE_REQUEST = '[Profiles Services] Delete Services Request',
    SET_PROFILE_SERVICES = '[Profiles Services] Set profile Services',
    DELETE_PROFILE_SERVICE_SUCCESS = '[Profiles Services] Delete Services Success',
    CREATE_PROFILE_SERVICE_REQUEST = '[Profiles Services] Create Services Request',
    CREATE_PROFILE_SERVICE_SUCCESS = '[Profiles Services] Create Services Success',
};

export const setProfileServices = createAction(
    ProfileServiceActionTypes.SET_PROFILE_SERVICES,
    props<{profileServices: IProfileService[]}>()
)

export const deleteServiceRequest = createAction(
    ProfileServiceActionTypes.DELETE_SERVICE_REQUEST,
    props<{profileServices: IProfileService}>()
)

export const deleteServiceSuccess = createAction(
    ProfileServiceActionTypes.DELETE_PROFILE_SERVICE_SUCCESS,
    props<{profileServices: IProfileService}>()
)

export const createServiceRequest = createAction(
  ProfileServiceActionTypes.CREATE_PROFILE_SERVICE_REQUEST,
  props<{profileServices: IProfileService}>()
)

export const createServiceSuccess = createAction(
  ProfileServiceActionTypes.CREATE_PROFILE_SERVICE_SUCCESS,
  props<{profileServices: IProfileService}>()
)
