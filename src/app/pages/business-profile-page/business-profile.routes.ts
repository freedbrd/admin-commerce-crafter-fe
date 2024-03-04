import { Routes } from '@angular/router';

export const businessProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../business-profile-page/pages/business-profiles/business-profiles.component').then(c => c.BusinessProfilesComponent),
    pathMatch: 'full',
  },
  {
    path: ':businessId',
    loadComponent: () => import('../business-profile-page/pages/business-profile/business-profile.component').then(c => c.BusinessProfileComponent)
  },
  {
    path: ':businessId/service/:serviceId',
    loadComponent: () => import('../business-profile-page/pages/profile-service-page/profile-service-page.component').then(c => c.ProfileServicePageComponent)
  },
  {
    path: ':businessId/resource/:resourceId',
    loadComponent: () => import('../business-profile-page/pages/profile-resource-page/profile-resource-page.component').then(c => c.ProfileResourcePageComponent)
  },
]
