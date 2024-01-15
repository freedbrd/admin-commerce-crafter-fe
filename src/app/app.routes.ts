import { Routes } from '@angular/router';
import { AUTH_LAYOUT_ROUTES } from './layouts/auth-layout/auth-layout.routes';
import { MAIN_LAYOUT_ROUTES } from './layouts/main-layout/main-layout.routes';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: MAIN_LAYOUT_ROUTES,
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    children: AUTH_LAYOUT_ROUTES
  }
];
