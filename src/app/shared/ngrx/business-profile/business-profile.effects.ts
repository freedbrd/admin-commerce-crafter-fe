import { setProfileServices } from './../business-profile-services/profile-services.actions';
import { Injectable } from '@angular/core';
import {
  BusinessProfileService
} from '../../services/business-profile.service';
import {
  addBusinessProfile,
  createBusinessProfile,
  deleteBusinessProfileRequest,
  deleteBusinessProfileSuccess,
  editBusinessProfileRequest,
  editBusinessProfileSuccess,
  getBusinessProfileById,
  getBusinessProfilesRequest,
  setBusinessProfileById,
  setBusinessProfiles,
} from './business-profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostgrestError } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase.service';

@Injectable()
export class BusinessProfileEffects {
  getBusinessProfilesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getBusinessProfilesRequest),
    switchMap(() => this.businessProfileService.getBusinessProfiles().pipe(
      map((businessProfiles: IBusinessProfile[]) => setBusinessProfiles({
        businessProfiles
      })),
    )),
  ))

  createBusinessProfile$ = createEffect(() => this.actions$.pipe(
    ofType(createBusinessProfile),
    switchMap(({businessProfile}) => {
      return this.businessProfileService.createBusinessProfile(businessProfile)
    }),
    map(res => {
      console.log(res);
      const [businessProfile] = res || [];
      return addBusinessProfile({
        businessProfile
      })
    })
  ))


  deleteBusinessProfileRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBusinessProfileRequest),
    switchMap(({businessProfile}) => this.businessProfileService.deleteBusinessProfile(businessProfile).pipe(
      switchMap(() => {
        return this.supabaseService.clearFolder('assets', `${businessProfile?.user_id}/${businessProfile.id}`)
      }),
      map(() => {
        this.nzNotificationService.success('Success', 'Business profile was removed')
        return deleteBusinessProfileSuccess({businessProfile})
      }),
      catchError(err => {
        this.nzNotificationService.error('Error', 'Try remove it later')
        return throwError(() => err)
      })
    )),
  ))

  editBusinessProfileRequest$ = createEffect(() => this.actions$.pipe(
    ofType(editBusinessProfileRequest),
    switchMap(({businessProfile}) => this.businessProfileService.updateBusinessProfile(businessProfile).pipe(
      map(() => {
        this.nzNotificationService.success('Success', 'Business profile updated')
        return editBusinessProfileSuccess({businessProfile})
      }),
      catchError((err: PostgrestError) => {
        this.nzNotificationService.error('Error', err.message ?? 'Try edit it later')
        return throwError(() => err)
      })
    ))
  ))

  getBusinessProfileById$ = createEffect(() => this.actions$.pipe(
    ofType(getBusinessProfileById),
    switchMap(({id}) => {
      return this.businessProfileService.getBusinessProfileById(id).pipe(
        map(businessProfile => setBusinessProfileById({businessProfile}))
      )
    })
  ))

  setProfileServices$ = createEffect(() => this.actions$.pipe(
    ofType(setBusinessProfileById),
    map(({businessProfile}) => setProfileServices({profileServices: businessProfile?.services || []}))
  ))

  constructor(
    private businessProfileService: BusinessProfileService,
    private actions$: Actions,
    private nzNotificationService: NzNotificationService,
    private supabaseService: SupabaseService
  ) {
  }
}
