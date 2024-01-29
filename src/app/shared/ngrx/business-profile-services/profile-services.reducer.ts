import { createReducer, on } from "@ngrx/store";
import { initialProfileServiceState, profileServiceAdapter } from "./profile-services.state";
import { deleteServiceSuccess, setProfileServices } from "./profile-services.actions";

export const profileServicesReducer = createReducer(
    initialProfileServiceState,
    on(
        setProfileServices, 
        (state, {profileServices}) => profileServiceAdapter.setAll(profileServices, state)
    ),
    on(
        deleteServiceSuccess,
        (state, {profileServices}) => profileServiceAdapter.removeOne(profileServices.id, state)
    )
)