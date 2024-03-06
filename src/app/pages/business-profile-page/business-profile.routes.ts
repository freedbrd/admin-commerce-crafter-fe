import { Routes } from '@angular/router';

export const businessProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/business-profile-list/business-profiles-list.component').then(c => c.BusinessProfilesListComponent),
    pathMatch: 'full',
  },
  {
    path: ':businessId',
    loadComponent: () => import('./pages/business-profile-item/business-profile-item.component').then(c => c.BusinessProfileItemComponent)
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
