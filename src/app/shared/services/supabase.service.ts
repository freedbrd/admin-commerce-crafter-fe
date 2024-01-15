import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient, Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { from, map, of, switchMap, throwError } from 'rxjs';
import { ISignupUser } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl,
      environment.supabaseKey);
  }

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>) {
    this.supabase.auth.onAuthStateChange(callback)
  }

  login(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password
    })).pipe(
      switchMap(res => {
        if(res.error) {
          return throwError(() => res.error)
        }

        return of(res.data)
      })
    )
  }

  logout() {
    return from(this.supabase.auth.signOut()).pipe(
      switchMap(res => {
        if(res.error) {
          return throwError(() => res.error)
        }

        return of(true)
      })
    )
  }

  signup({email, password}: ISignupUser) {
    return from(this.supabase.auth.signUp({
      email,
      password,
    })).pipe(
        switchMap(res => {
          if(res.error) {
            return throwError(() => res.error)
          }

          return of(res.data)
        })
    )
  }

  insertAndSelect<T>(table: string, columns: any, selectFields: string) {
    return from(this.supabase.from(table).insert(columns).select(selectFields))
    .pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res)
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }

  select<T>(table: string) {
    return from(this.supabase.from(table).select('*'))
    .pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res)
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }

  selectById<T>(table: string, match: string, eq = 'id') {
    return from(this.supabase.from(table).select('*').eq(eq, match).single())
    .pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res)
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }
}
