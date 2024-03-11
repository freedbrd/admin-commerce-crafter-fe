import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient, Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import {
  catchError, forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap, tap,
  throwError,
} from 'rxjs';
import { ISignupUser } from '../interfaces/profile.interface';
import { FileObject } from '@supabase/storage-js/src/lib/types';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl,
      environment.supabaseKey);
  }

  getSession() {
    return from(this.supabase.auth.getSession()).pipe(
      switchMap(res => {
        if (res?.error) {
          return throwError(() => res?.error);
        }

        return of(res?.data);
      }),
    );
  }

  onAuthStateChange(callback: (
    event: AuthChangeEvent, session: Session | null) => void | Promise<void>) {
    this.supabase.auth.onAuthStateChange(callback);
  }

  login(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password,
    })).pipe(
      switchMap(res => {
        if (res?.error) {
          return throwError(() => res?.error);
        }

        return of(res?.data);
      }),
    );
  }

  logout() {
    return from(this.supabase.auth.signOut()).pipe(
      switchMap(res => {
        if (res.error) {
          return throwError(() => res.error);
        }

        return of(true);
      }),
    );
  }

  signup({email, password}: ISignupUser) {
    return from(this.supabase.auth.signUp({
      email,
      password,
    })).pipe(
      switchMap(res => {
        if (res?.error) {
          return throwError(() => res?.error);
        }

        return of(res?.data);
      }),
    );
  }

  insertAndSelect<T>(table: string, columns: any, selectFields: string) {
    return from(this.supabase.from(table).insert(columns).select(selectFields)).
      pipe(
        switchMap(res => {
          return res.error ? throwError(() => res.error) : of(res);
        }),
        map((response) => {
            return response.data as T;
          },
        ),
      );
  }

  select<T>(table: string, joinString = '') {
    return from(this.supabase.from(table).select(`* ${joinString ? ', ' + joinString : ''}`)).pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res);
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }

  selectById<T>(table: string, match: string, eq = 'id', joinString = '') {
    return from(this.supabase.from(table).
      select(`* ${joinString ? ', ' + joinString : ''}`).
      eq(eq, match).
      single()).
      pipe(
        switchMap(res => {
          return res.error ? throwError(() => res.error) : of(res);
        }),
        map((response) => {
            return response.data as T;
          },
        ),
      );
  }

  update<T>(table: string, data: T, match: string, eq = 'id') {
    return from(
      this.supabase.from(table).update(data).eq(eq, match).select(),
    ).pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res);
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }

  delete<T>(table: string, match: string, eq = 'id') {
    return from(this.supabase.from(table).delete().eq(eq, match)).pipe(
      switchMap(res => {
        return res.error ? throwError(() => res.error) : of(res);
      }),
      map((response) => {
          return response.data as T;
        },
      ),
    );
  }

  removeImages(bucket: string, imageUrls: string[]) {
    return from(this.supabase.storage.from(bucket).remove(imageUrls)).pipe(
      map(({error, data}) => {
        if(error) {
          throw error;
        }

        return data;
      }),
      catchError((err) => {
        return throwError(() => err)
      })
    )
  }

  getListOfFiles(bucket: string, path: string) {
    return from(this.supabase.storage.from(bucket).list(path)).pipe(
      map(({error, data}) => {
        if(error) {
          throw error;
        }

        return data;
      }),
      catchError((err) => {
        return throwError(() => err)
      })
    )
  }

  clearFolder(bucket: string, path: string) {
    return this.getListOfFiles(bucket, path).pipe(
      tap(console.log),
      switchMap((res: FileObject[]) => {
        const fileList = res.map(fileObject => {
          return `${path}/${fileObject.name}`
        })

        return this.removeImages(bucket, fileList)
      })
    )
  }

  uploadImages(filePath: string, fileName: string, files: File[] | Blob[], folder = '') {
    const uploadObservables = files.map((file, index) => {
      const fileName = `${Date.now()}-${index}`;
      return from(this.supabase.storage.from('assets').upload(`${filePath}/${fileName}`, file, {
        upsert: true,
      })).pipe(
        map(({ error }) => {
          if (error) {
            throw error;
          }
          return {
            fileName: fileName,
            filePath: `${filePath}/${fileName}`,
            fileUrl: `${environment.supabaseUrl}/storage/v1/object/public/${folder}${filePath}/${fileName}`,
          };
        }),
        catchError(error => of({
          fileName: fileName,
          filePath: `${filePath}/${fileName}`,
          fileUrl: `${environment.supabaseUrl}/storage/v1/object/public/${folder}${filePath}/${fileName}`,
          error: error.message
        })),
      );
    });

    return forkJoin(uploadObservables).pipe(
      catchError(error => throwError(() => new Error(`Upload failed: ${error.message}`)))
    );
  }
}
