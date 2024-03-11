import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import { Observable } from 'rxjs';
import {
  IProfileService,
} from '@shared/interfaces/business-profile.interface';
import { Store } from '@ngrx/store';
import {
  profileServicesSelector,
} from '@shared/ngrx/business-profile-services/profile-services.selector';
import { RouterModule } from '@angular/router';
import {
  ServiceProfileService,
} from '@shared/services/service-profile.service';
import {
  deleteServiceRequest
} from '@shared/ngrx/business-profile-services/profile-services.actions';

@Component({
  selector: 'app-profile-services',
  standalone: true,
  imports: [CommonModule, ZorroModule, RouterModule],
  templateUrl: './profile-services.component.html',
  styleUrl: './profile-services.component.scss'
})
export class ProfileServicesComponent {
  profileServicesSelector$: Observable<IProfileService[]>

  constructor(
    private store: Store,
    private serviceProfileService: ServiceProfileService
  ) {
    this.profileServicesSelector$ = this.store.select(profileServicesSelector)
  }

  delete(profileService: IProfileService) {
    this.store.dispatch(deleteServiceRequest({
      profileService
    }))
  }
}
