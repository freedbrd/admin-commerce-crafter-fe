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
  getBusinessProfiles,
  setBusinessProfiles,
} from './business-profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PostgrestError } from '@supabase/supabase-js';

@Injectable()
export class BusinessProfileEffects {
  getBusinessProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(getBusinessProfiles),
    switchMap(() => this.businessProfileService.getBusinessProfiles()),
    map((businessProfiles: IBusinessProfile[]) => setBusinessProfiles({
      businessProfiles
    }))
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

  constructor(
    private businessProfileService: BusinessProfileService,
    private actions$: Actions,
    private nzNotificationService: NzNotificationService
  ) {
  }
}
