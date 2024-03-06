import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getBusinessProfileById,
} from '@shared/ngrx/business-profile/business-profile.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  currentBusinessProfileName,
} from '@shared/ngrx/business-profile/business-profile.selectors';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import {
  ProfileServicesComponent,
} from './components/profile-services/profile-services.component';
import {
  ProfileResourcesComponent,
} from './components/profile-resources/profile-resources.component';

@Component({
  selector: 'app-business-profile-item',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    ProfileServicesComponent,
    ProfileResourcesComponent,
  ],
  templateUrl: './business-profile-item.component.html',
  styleUrl: './business-profile-item.component.scss',
})
export class BusinessProfileItemComponent implements OnInit {
  currentBusinessProfileName$: Observable<string>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
    this.currentBusinessProfileName$ = this.store.select(
      currentBusinessProfileName);
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
