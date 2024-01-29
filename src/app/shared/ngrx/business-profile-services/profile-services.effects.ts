import { IBusinessProfile } from './../../interfaces/business-profile.interface';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { deleteServiceRequest, deleteServiceSuccess } from "./profile-services.actions";
import { map, switchMap, withLatestFrom } from "rxjs";
import { BusinessActivityService } from "../../services/business-activity.service";
import { editBusinessProfileSuccess } from "../business-profile/business-profile.actions";
import { Store } from "@ngrx/store";
import { currentBusinessProfile } from "../business-profile/business-profile.selectors";

@Injectable()
export class ProfileServiceEffects {
    deleteActivityRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteServiceRequest),
        switchMap(({profileServices}) => this.businessActivityService.deleteBusinessActivity(profileServices?.id).pipe(
            map(() => deleteServiceSuccess({profileServices}))
        ))
    ))

    deleteServiceSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(deleteServiceSuccess),
        withLatestFrom(this.store.select(currentBusinessProfile)),
        map(([{profileServices}, businessProfile]) => {
            const services = businessProfile.services;
            const updatedServices = services.filter(item => item.id !== profileServices.id)

            const updatedBusinessProfile: IBusinessProfile = {
                ...businessProfile,
                services: updatedServices
            }
        
            return editBusinessProfileSuccess({
                businessProfile: updatedBusinessProfile
            })
        })
    ))

    constructor(
        private actions$: Actions,
        private businessActivityService: BusinessActivityService,
        private store: Store
    ) { }
}