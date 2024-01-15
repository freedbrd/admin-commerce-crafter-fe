import {
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSession } from '../ngrx/auth/auth.selectors';
import { of, switchMap } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { Session } from '@supabase/supabase-js';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  const router = inject(Router)

  const session: Session = JSON.parse(localStorage.getItem('session') as string);

  return session?.access_token ? of(true) : of(router.parseUrl('auth'))
}
