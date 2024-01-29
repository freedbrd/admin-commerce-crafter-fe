import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BusinessProfileServiceState, profileServiceAdapter } from "./profile-services.state";

export const profileServieState = createFeatureSelector<BusinessProfileServiceState>('profileServices');

const {selectAll} = profileServiceAdapter.getSelectors();

export const profileServicesSelector = createSelector(
    profileServieState,
    selectAll
)