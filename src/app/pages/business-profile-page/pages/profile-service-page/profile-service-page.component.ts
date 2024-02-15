import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import {
  ImageFilePickerComponent,
} from '../../../../shared/value-accessors/image-file-picker/image-file-picker.component';
import {
  MultiImageFilePickerComponent,
} from '../../../../shared/value-accessors/multi-image-file-picker/multi-image-file-picker.component';
import {
  TransferItemComponent,
} from '../../../../shared/value-accessors/transfer-item/transfer-item.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ServiceProfileService
} from '../../../../shared/services/service-profile.service';
import {
  base64ToBlobHelper
} from '../../../../shared/helpers/base64-to-blob.helper';
import { select, Store } from '@ngrx/store';
import {
  selectProfile,
  selectUserId,
} from '../../../../shared/ngrx/auth/auth.selectors';
import { BehaviorSubject } from 'rxjs';
import {
  IProfileService
} from '../../../../shared/interfaces/business-profile.interface';

@Component({
  selector: 'app-profile-service-page',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    ImageFilePickerComponent,
    MultiImageFilePickerComponent,
    ReactiveFormsModule,
    TransferItemComponent],
  templateUrl: './profile-service-page.component.html',
  styleUrl: './profile-service-page.component.scss',
})
export class ProfileServicePageComponent implements OnInit {
  isLoading = false;
  private userId$ = new BehaviorSubject<string | null>(null);

  form: FormGroup;

  mockArray = [
    {label: 'Test1', value: '123'},
    {label: 'Test2', value: '1233'},
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private serviceProfileService: ServiceProfileService,
    private store: Store
  ) {
    this.store.pipe(select(selectUserId)).subscribe(this.userId$);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentService();
  }

  onSubmit() {
    const {businessId} = this.activatedRoute.snapshot.params;

    const newProfileService = this.form.getRawValue() as IProfileService;
    const mainImageBlob = base64ToBlobHelper(newProfileService.main_image);
    const showChaseImages = newProfileService.showcase_images.map(item => base64ToBlobHelper(item))

    this.serviceProfileService.createService(
      {...newProfileService, main_image: '', showcase_images: [], business_profile_id: businessId},
      mainImageBlob,
      showChaseImages,
      this.userId$.value
    ).subscribe(res => {
      console.log(res);
    })
  }

  private getCurrentService() {
    const {serviceId} = this.activatedRoute.snapshot.params;

    if (serviceId === 'new' || !serviceId) {
      console.log('new');

      return;
    }

    console.log('get service');
  }

  private initForm() {
    this.form = this.fb.group({
      name: [''],
      price: [null],
      description: [''],
      showcase_images: [[]],
      main_image: [null],
      business_profile_id: [''],
      service_resource_ids: [],
    });
  }

}
