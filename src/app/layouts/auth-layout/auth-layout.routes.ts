import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
