import { Component } from '@angular/core';
import {
  profileResourcesSelector,
} from '../../../../../../shared/ngrx/business-profile-resources/profile-resource.selector';
import { Observable } from 'rxjs';
import {
  IProfileResource,
} from '../../../../../../shared/interfaces/business-profile.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  ZorroModule,
} from '../../../../../../shared/modules/zorro/zorro.module';
import { RouterModule } from '@angular/router';
import {
  removeProfileResourceRequest
} from '../../../../../../shared/ngrx/business-profile-resources/profile-resource.actions';

@Component({
  selector: 'app-profile-resources',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    RouterModule,
  ],
  templateUrl: './profile-resources.component.html',
  styleUrl: './profile-resources.component.scss',
})
export class ProfileResourcesComponent {
  profileResources$: Observable<IProfileResource[]>;

  constructor(
    private store: Store,
  ) {
    this.profileResources$ = this.store.select(profileResourcesSelector);
  }

  delete(data: IProfileResource) {
    this.store.dispatch(removeProfileResourceRequest({id: data.id}))
  }
}