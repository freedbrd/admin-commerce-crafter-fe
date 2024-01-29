import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import {
  IBusinessProfile,
} from '../../../../shared/interfaces/business-profile.interface';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  businessProfileSelector,
} from '../../../../shared/ngrx/business-profile/business-profile.selectors';
import {
  createBusinessProfile,
  deleteBusinessProfileRequest,
  editBusinessProfileRequest,
  getBusinessProfilesRequest,
} from '../../../../shared/ngrx/business-profile/business-profile.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BusinessProfileModalComponent,
} from '../business-profile-modal/business-profile-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profiles',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
  ],
  templateUrl: './business-profiles.component.html',
  styleUrl: './business-profiles.component.scss'
})
export class BusinessProfilesComponent implements OnInit {
  businessProfiles$: Observable<IBusinessProfile[] | null>

  constructor(
    private store: Store,
    private nzModalService: NzModalService,
    private router: Router
  ) {
    this.businessProfiles$ = this.store.select(businessProfileSelector);
  }

  ngOnInit() {
    this.store.dispatch(getBusinessProfilesRequest());
  }

  create() {
    const nzModalRef = this.nzModalService.create({
      nzTitle: 'Create a new business profile',
      nzContent: BusinessProfileModalComponent,
      nzFooter: null
    });

    nzModalRef.afterClose.pipe(
      take(1)
    ).subscribe((businessProfile: IBusinessProfile) => {
      if(!businessProfile) {
        return;
      }

      this.store.dispatch(createBusinessProfile({
        businessProfile
      }))
    })
  }

  edit(businessProfile: IBusinessProfile) {
    console.log(businessProfile);
    const nzModalRef = this.nzModalService.create({
      nzTitle: 'Edit a new business profile',
      nzContent: BusinessProfileModalComponent,
      nzFooter: null,
      nzData: {
        businessProfile
      }
    });

    nzModalRef.afterClose.pipe(
      take(1)
    ).subscribe((updatedBusinessProfile: IBusinessProfile) => {
      if(!updatedBusinessProfile) {
        return;
      }

      this.store.dispatch(editBusinessProfileRequest({
        businessProfile: {
          ...updatedBusinessProfile,
          id: businessProfile?.id
        }
      }))
    })
  }

  select(data: IBusinessProfile) {
    this.router.navigate(['/business-profiles', data?.id])
  }

  delete(businessProfile: IBusinessProfile) {
    this.store.dispatch(deleteBusinessProfileRequest({
      businessProfile
    }))
  }
}
