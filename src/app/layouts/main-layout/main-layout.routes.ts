import { Routes } from '@angular/router';
import {
  businessProfileRoutes
} from '../../pages/business-profile-page/business-profile.routes';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'business-profiles',
    pathMatch: 'full'
  },
  {
    path: 'business-profiles',
    loadComponent: () => import('../../pages/business-profile-page/business-profile-page.component').then(c => c.BusinessProfilePageComponent),
    children: businessProfileRoutes
  },
]
