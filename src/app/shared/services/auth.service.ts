import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IProfile, ISignupUser } from '../interfaces/profile.interface';
import { Session, User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSession } from '../ngrx/auth/auth.actions';
import { selectSession } from '../ngrx/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private store: Store
  ) {

    this.supabaseService.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === 'INITIAL_SESSION') {
        this.store.dispatch(setSession({
          session
        }))

        return;
      }
    })
  }

  signup(data: ISignupUser) {
    return this.supabaseService.signup(data);
  }

  logout() {
    return this.supabaseService.logout();
  }

  createProfile(data: ISignupUser, user: User): Observable<IProfile[]> {
    return this.supabaseService.insertAndSelect('profile', {
      name: data.name,
      email: data.email,
      user_id: user.id,
    }, '*')
  }

  getProfile(session: Session) {
    return this.supabaseService.selectById<IProfile>('profile', session?.user?.id, 'user_id')
  }

  login(email: string, password: string) {
    return this.supabaseService.login(email, password)
  }
}
