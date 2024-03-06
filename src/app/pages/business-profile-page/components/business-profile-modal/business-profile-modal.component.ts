import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../shared/modules/zorro/zorro.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  IBusinessProfile,
} from '../../../../shared/interfaces/business-profile.interface';

@Component({
  selector: 'app-business-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    ReactiveFormsModule,
  ],
  templateUrl: './business-profile-modal.component.html',
  styleUrl: './business-profile-modal.component.scss',
})
export class BusinessProfileModalComponent implements OnInit {
  form!: FormGroup;

  readonly nzModalData: {
    businessProfile: IBusinessProfile
  } = inject(NZ_MODAL_DATA);

  get businessProfile() {
    return this.nzModalData?.businessProfile || null;
  }

  constructor(
    private fb: FormBuilder,
    private nzModalRef: NzModalRef,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    this.nzModalRef.close(this.form.getRawValue());
  }

  close() {
    this.nzModalRef.close();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [this.businessProfile?.name ?? '', [Validators.required]],
      type: this.businessProfile?.type ?? 'service',
      currency: this.businessProfile?.currency ?? '',
      active: false,
    });
  }
}
