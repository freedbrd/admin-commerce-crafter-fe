import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getBusinessProfileById,
} from '@shared/ngrx/business-profile/business-profile.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  currentBusinessProfile,
  currentBusinessProfileName,
} from '@shared/ngrx/business-profile/business-profile.selectors';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import {
  ProfileServicesComponent,
} from './components/profile-services/profile-services.component';
import {
  ProfileResourcesComponent,
} from './components/profile-resources/profile-resources.component';
import {
  BusinessProfileType,
  IBusinessProfile,
} from '@shared/interfaces/business-profile.interface';
import {
  ProfileProductComponent
} from './components/profile-product/profile-product.component';

@Component({
  selector: 'app-business-profile-item',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    ProfileServicesComponent,
    ProfileResourcesComponent,
    ProfileProductComponent,
  ],
  templateUrl: './business-profile-item.component.html',
  styleUrl: './business-profile-item.component.scss',
})
export class BusinessProfileItemComponent implements OnInit {
  currentBusinessProfileName$: Observable<string>;
  currentBusinessProfile$: Observable<IBusinessProfile>;

  businessProfileType = BusinessProfileType

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
    this.currentBusinessProfileName$ = this.store.select(
      currentBusinessProfileName);

    this.currentBusinessProfile$ = this.store.select(
      currentBusinessProfile);
  }

  ngOnInit(): void {
    this.getCurrentBusinessProfile();
  }

  private getCurrentBusinessProfile() {
    const {businessId} = this.activatedRoute.snapshot.params;

    this.store.dispatch(getBusinessProfileById({
      id: businessId,
    }));
  }
}
