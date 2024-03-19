import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '@shared/modules/zorro/zorro.module';
import {
  ImageFilePickerComponent,
} from '@shared/value-accessors/image-file-picker/image-file-picker.component';
import {
  MultiImageFilePickerComponent,
} from '@shared/value-accessors/multi-image-file-picker/multi-image-file-picker.component';
import {
  TransferItemComponent,
} from '@shared/value-accessors/transfer-item/transfer-item.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { base64ToBlobHelper } from '@shared/helpers/base64-to-blob.helper';
import { select, Store } from '@ngrx/store';
import { selectUserId } from '@shared/ngrx/auth/auth.selectors';
import { BehaviorSubject, filter, Observable, take } from 'rxjs';
import {
  IProfileResource,
  IProfileService,
} from '@shared/interfaces/business-profile.interface';
import {
  clearSelectedService,
  createServiceRequest,
  editServiceRequest,
  getServiceByIdRequest,
} from '@shared/ngrx/business-profile-services/profile-services.actions';
import {
  currentProfileServiceSelector,
} from '@shared/ngrx/business-profile-services/profile-services.selector';
import {
  extractSupabaseFolders,
  isSupabaseImageUrl,
} from '@shared/helpers/is-supabase-image-url.helper';
import {
  profileResourcesSelector,
} from '@shared/ngrx/business-profile-resources/profile-resource.selector';
import {
  AvailableResourcesItemsPipe,
} from '@shared/pipes/available-resources-items.pipe';
import {
  ServiceProfileService
} from '@shared/services/service-profile.service';

@Component({
  selector: 'app-profile-service-page',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    ImageFilePickerComponent,
    MultiImageFilePickerComponent,
    ReactiveFormsModule,
    TransferItemComponent,
    AvailableResourcesItemsPipe,
  ],
  templateUrl: './profile-service-page.component.html',
  styleUrl: './profile-service-page.component.scss',
})
export class ProfileServicePageComponent implements OnInit, OnDestroy {
  profileResources$: Observable<IProfileResource[]>

  form: FormGroup;
  isLoading = false;
  currentProfileService: IProfileService;

  private userId$ = new BehaviorSubject<string | null>(null);
  private currentProfileService$: Observable<IProfileService>;
  private imagesToRemoveUrls: string[] = [];

  mockArray = [
    {label: 'Test1', value: '123'},
    {label: 'Test2', value: '1233'},
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.store.pipe(select(selectUserId)).subscribe(this.userId$);
    this.profileResources$ = this.store.select(profileResourcesSelector)
    this.currentProfileService$ = this.store.select(
      currentProfileServiceSelector);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentService();

    this.patchForm();
  }

  ngOnDestroy() {
    this.store.dispatch(clearSelectedService());
  }

  onSubmit() {
    const {businessId} = this.activatedRoute.snapshot.params;
    const newProfileService = this.form.getRawValue() as IProfileService;

    if (this.currentProfileService) {
      this.store.dispatch(editServiceRequest({
        profileServices: {
          ...this.currentProfileService,
          ...this.form.getRawValue(),
        },
        imagesToDelete: this.imagesToRemoveUrls,
      }));

      return;
    }

    this.store.dispatch(createServiceRequest({
      profileServices: {
        ...newProfileService,
        business_profile_id: businessId,
        user_id: this.userId$.value,
        active: true,
      }
    }));
  }

  handleRemoveImageUrl(url: string) {
    if (isSupabaseImageUrl(url)) {

      this.imagesToRemoveUrls.push(extractSupabaseFolders(url));
    }
  }

  private getCurrentService() {
    const {serviceId} = this.activatedRoute.snapshot.params;

    if (serviceId === 'new' || !serviceId) {
      return;
    }

    this.store.dispatch(getServiceByIdRequest({id: serviceId}));
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      showcase_images: [[]],
      main_image: [null],
      business_profile_id: [''],
      service_resource_ids: [],
    });
  }

  private patchForm() {
    this.currentProfileService$.pipe(
      filter(item => !!item),
      take(1),
    ).subscribe(profileService => {
      this.currentProfileService = profileService;
      this.form.patchValue(profileService);
    });
  }

}
