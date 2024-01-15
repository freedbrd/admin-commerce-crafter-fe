import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './shared/ngrx/auth/auth.reducer';
import { AuthEffects } from './shared/ngrx/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideStore(),
    provideState({
      name: 'auth',
      reducer: authReducer
    }),
    provideEffects([
      AuthEffects
    ]),
    importProvidersFrom([
      StoreDevtoolsModule.instrument({
        maxAge: 25
      })
    ]),
  ],
};
