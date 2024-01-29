import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBusinessProfileById, setBusinessProfileById } from '../../../../shared/ngrx/business-profile/business-profile.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { currentBusinessProfileName } from '../../../../shared/ngrx/business-profile/business-profile.selectors';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import { BusinessProfileServicesComponent } from './components/services/business-profile-services.component';
import { setProfileServices } from '../../../../shared/ngrx/business-profile-services/profile-services.actions';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [CommonModule, ZorroModule, BusinessProfileServicesComponent],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent implements OnInit, OnDestroy {
  currentBusinessProfileName$: Observable<string>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.currentBusinessProfileName$ = this.store.select(currentBusinessProfileName)
  }


  ngOnInit(): void {
    this.getCurrentBusinessProfile();
  }

  ngOnDestroy(): void {
    [setProfileServices({profileServices: []}), setBusinessProfileById({businessProfile: null})]
      .forEach((action) => this.store.dispatch(action));
  }

  private getCurrentBusinessProfile() {
    const {id} = this.activatedRoute.snapshot.params;

    this.store.dispatch(getBusinessProfileById({
      id
    }))
  }
}
