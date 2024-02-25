import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  getBusinessProfileById,
} from '../../../../shared/ngrx/business-profile/business-profile.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  currentBusinessProfileName,
} from '../../../../shared/ngrx/business-profile/business-profile.selectors';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import {
  BusinessProfileServicesComponent,
} from './components/services/business-profile-services.component';
import {
  BusinessProfileResourcesComponent,
} from './components/business-profile-resources/business-profile-resources.component';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [
    CommonModule, ZorroModule, BusinessProfileServicesComponent,
    BusinessProfileResourcesComponent],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent implements OnInit {
  currentBusinessProfileName$: Observable<string>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
    this.currentBusinessProfileName$ = this.store.select(currentBusinessProfileName)
  }


  ngOnInit(): void {
    this.getCurrentBusinessProfile();
  }

  private getCurrentBusinessProfile() {
    const {businessId} = this.activatedRoute.snapshot.params;

    this.store.dispatch(getBusinessProfileById({
      id: businessId
    }))
  }
}
