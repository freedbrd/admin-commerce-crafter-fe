import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login, logout,
  setProfile,
  setSession,
  signup,
  signupFailure,
  signupSuccess,
} from './auth.actions';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PostgrestError } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(signup),
    switchMap(({user}) => {
      return this.authService.signup(user).pipe(
        switchMap(res => {
          if (!res.user) {
            return of(signupFailure({error: 'User was not created'}));
          }

          return this.authService.createProfile(user, res.user).pipe(
            map(() => signupSuccess()),
            catchError(
              (err: PostgrestError) => of(signupFailure({error: err.message}))),
          );
        }),
        catchError(
          (err: PostgrestError) => of(signupFailure({error: err.message}))),
      );
    }),
  ));

  setSession$ = createEffect(() => this.actions$.pipe(
    ofType(setSession),
    switchMap(({session}) => {
      if(!session) {
        localStorage.setItem('session', JSON.stringify(null))
        return of(null)
      }

      localStorage.setItem('session', JSON.stringify(session))
      return this.authService.getProfile(session)
    }),
    map((res) => {
      if (res) {
        this.router.navigate(['/']);
      }



      return setProfile({
        profile: res
      })
    }),
    catchError(err => {
      this.nzNotificationService.error(err.type || 'Error', err.error);

      return throwError(() => err)
    })
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(({password, email}) => {
      return this.authService.login(email, password)
    }),
    map(res => setSession({
      session: res?.session
    })),
    catchError(err => {
      this.nzNotificationService.error(err.type || 'Error', 'Invalid login credentials');
      return throwError(() => err)
    })
  ))

  signupFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(signupFailure),
        tap(err => {
          this.nzNotificationService.error(err.type || 'Error', err.error);
        }),
      ),
    {dispatch: false},
  );

  signupSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(signupSuccess),
        tap(() => {
          this.nzNotificationService.success('Success', 'User was created');
          this.router.navigate(['auth']);
        }),
      ),
    {dispatch: false},
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    switchMap(() => this.authService.logout()),
    map(() => setSession({
      session: null
    })),
    tap(() => {
      localStorage.setItem('session', JSON.stringify(null));
      this.router.navigate(['/auth']);
    })
  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private nzNotificationService: NzNotificationService,
  ) {
  }
}
