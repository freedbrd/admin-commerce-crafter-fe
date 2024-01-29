import { Routes } from '@angular/router';

export const businessProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../business-profile-page/pages/business-profiles/business-profiles.component').then(c => c.BusinessProfilesComponent),
    pathMatch: 'full',
  },
  {
    path: ':id',
    loadComponent: () => import('../business-profile-page/pages/business-profile/business-profile.component').then(c => c.BusinessProfileComponent)
  },
  {
    path: ':id/service/:id',
    loadComponent: () => import('../business-profile-page/pages/profile-service-page/profile-service-page.component').then(c => c.ProfileServicePageComponent)
  },
]
