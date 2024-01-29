import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZorroModule } from '../../../../../../shared/modules/zorro/zorro.module';
import { Observable } from 'rxjs';
import { IProfileService } from '../../../../../../shared/interfaces/business-profile.interface';
import { Store } from '@ngrx/store';
import { businessProfileServices } from '../../../../../../shared/ngrx/business-profile/business-profile.selectors';
import { deleteServiceRequest } from '../../../../../../shared/ngrx/business-profile-services/profile-services.actions';
import { profileServicesSelector } from '../../../../../../shared/ngrx/business-profile-services/profile-services.selector';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-profile-services',
  standalone: true,
  imports: [CommonModule, ZorroModule, RouterModule],
  templateUrl: './business-profile-services.component.html',
  styleUrl: './business-profile-services.component.scss'
})
export class BusinessProfileServicesComponent {
  profileServicesSelector$: Observable<IProfileService[]>

  constructor(
    private store: Store
  ) {
    this.profileServicesSelector$ = this.store.select(profileServicesSelector)
  }

  create() {}

  delete(profileServices: IProfileService) {
    this.store.dispatch(deleteServiceRequest({
      profileServices
    }))
  }
}
