import { HttpInterceptorFn } from '@angular/common/http';
import { SupabaseService } from '@shared/services/supabase.service';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const supabaseService = inject(SupabaseService)

  return supabaseService.getSession().pipe(
    switchMap((res) => {
      const token = res?.session?.access_token;

      if (token) {
        request = request?.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      return next(request);
    })
  )
};
