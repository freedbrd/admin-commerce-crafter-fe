import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createProfileResourceRequest,
  editProfileResourceRequest,
  getProfileResourceByIdRequest,
  getProfileResourceByIdSuccess,
  removeProfileResourceRequest, removeProfileResourceSuccess,
} from './profile-resource.actions';
import { finalize, map, switchMap, tap } from 'rxjs';
import {
  ProfileResourceService,
} from '../../services/profile-resource.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { createAction } from '@ngrx/store';

@Injectable()
export class ProfileResourceEffects {

  createProfileResourceRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createProfileResourceRequest),
    switchMap(({profileResources}) => {
      return this.profileResourceService.createProfileResource(profileResources).pipe(
        tap(() => this.router.navigate(['business-profiles', profileResources?.business_profile_id])),
        finalize(() => {
          this.nzNotificationService.success('Service was updated', '');
        })
      )
    }),
  ), {dispatch: false})

  getProfileResourceById$ = createEffect(() => this.actions$.pipe(
    ofType(getProfileResourceByIdRequest),
    switchMap(({id}) => {
      return this.profileResourceService.getProfileResourceById(id).pipe(
        map((profileResource) => getProfileResourceByIdSuccess({profileResource}))
      )
    })
  ))

  editProfileResourceRequest$ = createEffect(() => this.actions$.pipe(
    ofType(editProfileResourceRequest),
    switchMap(({profileResource}) => {
      return this.profileResourceService.editProfileResource(profileResource).pipe(
        tap(() => this.router.navigate(['business-profiles', profileResource?.business_profile_id])),
        finalize(() => {
          this.nzNotificationService.success('Service was updated', '');
        })
      )
    })
  ), {dispatch: false})

  removeProfileResourceRequest$ = createEffect(() => this.actions$.pipe(
    ofType(removeProfileResourceRequest),
    switchMap(({id}) => {
      return this.profileResourceService.removeProfileResource(id).pipe(
        map(() => removeProfileResourceSuccess({id}))
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private profileResourceService: ProfileResourceService,
    private router: Router,
    private nzNotificationService: NzNotificationService
  ) {
  }
}
