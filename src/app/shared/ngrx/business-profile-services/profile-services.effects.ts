import { IBusinessProfile } from '../../interfaces/business-profile.interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createServiceRequest,
  deleteServiceImages,
  deleteServiceRequest,
  deleteServiceSuccess,
  editServiceRequest,
  getServiceByIdRequest,
  getServiceByIdSuccess,
} from './profile-services.actions';
import {
  catchError, finalize,
  map,
  of,
  switchMap, tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import {
  BusinessActivityService,
} from '../../services/business-activity.service';
import {
  editBusinessProfileSuccess,
} from '../business-profile/business-profile.actions';
import { Store } from '@ngrx/store';
import {
  currentBusinessProfile,
} from '../business-profile/business-profile.selectors';
import { ServiceProfileService } from '../../services/service-profile.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SupabaseService } from '../../services/supabase.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProfileServiceEffects {
  deleteActivityRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteServiceRequest),
    switchMap(({profileService}) => {
      return this.serviceProfileService.deleteService(profileService).pipe(
        map(() => deleteServiceSuccess({profileService})),
        catchError((err: HttpErrorResponse) => {
          this.nzNotificationServices.error(`${err.statusText}.`, `${err?.error?.error}. ${err?.error?.details}`)
          return throwError(() => err)
        }),
      )
    })
  ));

  deleteServiceSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(deleteServiceSuccess),
    withLatestFrom(this.store.select(currentBusinessProfile)),
    map(([{profileService}, businessProfile]) => {
      const services = businessProfile?.services;
      const updatedServices = services?.filter(
        item => item?.id !== profileService?.id);

      const updatedBusinessProfile: IBusinessProfile = {
        ...businessProfile,
        services: updatedServices,
      };

      this.nzNotificationServices.success('Service was removed', '')

      return editBusinessProfileSuccess({
        businessProfile: updatedBusinessProfile,
      });
    }),
  ));

  editService$ = createEffect(() => this.actions$.pipe(
    ofType(editServiceRequest),
    switchMap(({profileServices, mainImage, showCasesImages, imagesToDelete}) => {
      return this.serviceProfileService.editService(profileServices, mainImage, showCasesImages, profileServices.user_id).pipe(
        map(() => deleteServiceImages({imagesToDelete}))
      ).pipe(
        tap(() => this.router.navigate(['business-profiles', profileServices?.business_profile_id])),
        finalize(() => {
          this.nzNotificationServices.success('Service was updated', '');
        })
      )
    }),
    catchError((err) => {
      this.nzNotificationServices.error('Service was not updated. Try again later', '')
      return throwError(() => err)
    }),
  ))

  createService$ = createEffect(() => this.actions$.pipe(
    ofType(createServiceRequest),
    switchMap(({profileServices}) => {
      return this.serviceProfileService.createService(profileServices).pipe(
        tap(() => {
          this.nzNotificationServices.success('Service was created', '');
          this.router.navigate(
            ['business-profiles', profileServices?.business_profile_id]);
        }),
      );
    }),
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      this.nzNotificationServices.error(`${err.statusText}.`, `${err?.error?.error}. ${err?.error?.details}`)
      return throwError(() => err)
    }),
  ), { dispatch: false })

  imagesToDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteServiceImages),
    switchMap(({imagesToDelete}) => imagesToDelete?.length ? this.serviceProfileService.removeImages(imagesToDelete) : of(null))
  ), {dispatch: false})

  getServiceById$ = createEffect(() => this.actions$.pipe(
    ofType(getServiceByIdRequest),
    switchMap(({id}) => {
      return this.serviceProfileService.getProfileServiceById(id)
    }),
    map(profileService => {
      return getServiceByIdSuccess({service: profileService})
    })
  ))

  constructor(
    private actions$: Actions,
    private businessActivityService: BusinessActivityService,
    private serviceProfileService: ServiceProfileService,
    private store: Store,
    private router: Router,
    private nzNotificationServices: NzNotificationService,
    private supabaseService: SupabaseService
  ) {
  }
}
