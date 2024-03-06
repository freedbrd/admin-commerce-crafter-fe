import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  ImageFilePickerComponent,
} from '@shared/value-accessors/image-file-picker/image-file-picker.component';
import {
  TimeslotPickerComponent,
} from '@shared/value-accessors/timeslot-picker/timeslot-picker.component';
import {
  clearCurrentProfileResource,
  createProfileResourceRequest,
  editProfileResourceRequest,
  getProfileResourceByIdRequest,
} from '@shared/ngrx/business-profile-resources/profile-resource.actions';
import {
  IProfileResource,
} from '@shared/interfaces/business-profile.interface';
import {
  currentResourceSelector,
} from '@shared/ngrx/business-profile-resources/profile-resource.selector';
import { filter, Observable, take } from 'rxjs';

@Component({
  selector: 'app-profile-resource-page',
  standalone: true,
  imports: [
    ZorroModule,
    CommonModule,
    ReactiveFormsModule,
    ImageFilePickerComponent,
    TimeslotPickerComponent,
  ],
  templateUrl: './profile-resource-page.component.html',
  styleUrl: './profile-resource-page.component.scss'
})
export class ProfileResourcePageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  currentProfileResource: IProfileResource;

  private currentProfileResource$: Observable<IProfileResource>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
    this.currentProfileResource$ = this.store.select(currentResourceSelector)
  }

  ngOnInit() {
    this.getCurrentResource();
    this.initForm();

    this.patchForm();
  }

  ngOnDestroy() {
    this.store.dispatch(clearCurrentProfileResource())
  }

  onSubmit() {
    const {businessId} = this.activatedRoute.snapshot.params;

    if (this.currentProfileResource) {
      this.store.dispatch(editProfileResourceRequest({
        profileResource: {
          ...this.currentProfileResource,
          ...this.form.getRawValue(),
        }
      }))
      return
    }

    this.store.dispatch(createProfileResourceRequest({
      profileResources: {
        ...this.form.getRawValue(),
        business_profile_id: businessId
      }
    }))
  }

  private initForm() {
    this.form = this.fb.group({
      name: [''],
      resource_type: [''],
      description: [''],
      schedule: [[]],
    })
  }

  private getCurrentResource() {
    const {resourceId} = this.activatedRoute.snapshot.params;

    if (resourceId === 'new' || !resourceId) {
      return;
    }

    this.store.dispatch(getProfileResourceByIdRequest({id: resourceId}))
  }

  private patchForm() {
    this.currentProfileResource$.pipe(
      filter(item => !!item),
      take(1),
    ).subscribe(profileService => {
      console.log(profileService);
      this.currentProfileResource = profileService;
      this.form.patchValue(profileService);
    });
  }
}
