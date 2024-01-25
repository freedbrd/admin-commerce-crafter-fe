import { createAction, createSelector, props } from '@ngrx/store';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import {
  BusinessProfileService,
} from '../../services/business-profile.service';

export enum BusinessProfileActionTypes {
  GET_BUSINESS_PROFILES = '[Business Profiles] Get business profiles',
  SET_BUSINESS_PROFILES = '[Business Profiles] Set business profiles',
  CREATE_BUSINESS_PROFILES = '[Business Profiles] Create business profiles',
  ADD_BUSINESS_PROFILE = '[Business Profiles] Add business profiles',
  DELETE_BUSINESS_PROFILE_REQUEST = '[Business Profiles] DELETE REQUEST business profiles',
  DELETE_BUSINESS_PROFILE_SUCCESS = '[Business Profiles] Delete Success business profiles',
  EDIT_BUSINESS_PROFILE_REQUEST = '[Business Profiles] EDIT REQUEST business profiles',
  EDIT_BUSINESS_PROFILE_SUCCESS = '[Business Profiles] EDIT SUCCESS business profiles',
}

export const getBusinessProfiles = createAction(
  BusinessProfileActionTypes.GET_BUSINESS_PROFILES,
);

export const setBusinessProfiles = createAction(
  BusinessProfileActionTypes.SET_BUSINESS_PROFILES,
  props<{ businessProfiles: IBusinessProfile[] }>(),
);

export const createBusinessProfile = createAction(
  BusinessProfileActionTypes.CREATE_BUSINESS_PROFILES,
  props<{ businessProfile: IBusinessProfile }>(),
);

export const addBusinessProfile = createAction(
  BusinessProfileActionTypes.ADD_BUSINESS_PROFILE,
  props<{ businessProfile: IBusinessProfile }>(),
);

export const deleteBusinessProfileRequest = createAction(
  BusinessProfileActionTypes.DELETE_BUSINESS_PROFILE_REQUEST,
  props<{ businessProfile: IBusinessProfile }>(),
);

export const deleteBusinessProfileSuccess = createAction(
  BusinessProfileActionTypes.DELETE_BUSINESS_PROFILE_SUCCESS,
  props<{ businessProfile: IBusinessProfile }>(),
);

export const editBusinessProfileRequest = createAction(
  BusinessProfileActionTypes.EDIT_BUSINESS_PROFILE_REQUEST,
  props<{businessProfile: IBusinessProfile}>()
)
export const editBusinessProfileSuccess = createAction(
  BusinessProfileActionTypes.EDIT_BUSINESS_PROFILE_SUCCESS,
  props<{businessProfile: IBusinessProfile}>()
)
