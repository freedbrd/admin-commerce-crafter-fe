import { Component, inject, OnInit } from '@angular/core';
import {
  IResourceSchedule,
} from '../../../../interfaces/business-profile.interface';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ZorroModule } from '../../../../modules/zorro/zorro.module';
import { CommonModule } from '@angular/common';
import { TIMESLOTS } from '../../../../constants/timeslotes.constant';

interface IModalData {
  currentDay: IResourceSchedule;
}

@Component({
  selector: 'app-timeslot-modal',
  standalone: true,
  imports: [
    ZorroModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './timeslot-modal.component.html',
  styleUrl: './timeslot-modal.component.scss',
})
export class TimeslotModalComponent implements OnInit {
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  form: FormGroup;

  TIMESLOTS = TIMESLOTS;

  get currentDay() {
    return this.nzModalData.currentDay;
  }

  get timeslotFormArray() {
    return this.form.get('timeslots') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private nzModalRef: NzModalRef
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  removeTimeslotItem(index: number) {
    const formArray = this.timeslotFormArray;

    formArray.removeAt(index);
  }

  addTimeslot() {
    const formArray = this.timeslotFormArray;

    formArray.push(this.createControl());
  }

  submit() {
    this.nzModalRef.close(this.form.value)
  }

  cancel() {
    this.nzModalRef.close()
  }

  private initForm() {
    const timeslots = this.currentDay.timeslots;

    if(!timeslots?.length) {
      this.form = this.fb.group({
        timeslots: this.fb.array([this.createControl()]),
      });

      return;
    }

    const timeslotsArray = timeslots.map(item => {
      return this.createControl(item.startTime, item.endTime)
    })

    this.form = this.fb.group({
      timeslots: this.fb.array(timeslotsArray),
    });
  }

  private createControl(startTime = '10:00', endTime = '18:00') {
    return this.fb.group({
      startTime: [startTime],
      endTime: [endTime],
    });
  }
}
