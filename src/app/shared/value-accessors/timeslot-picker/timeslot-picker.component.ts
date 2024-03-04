import { Component, forwardRef } from '@angular/core';
import {
  IResourceSchedule,
  IResourceScheduleTimeslot,
} from '../../interfaces/business-profile.interface';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../modules/zorro/zorro.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  TimeslotModalComponent
} from './components/timeslot-modal/timeslot-modal.component';
import { take } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-timeslot-picker',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
  ],
  templateUrl: './timeslot-picker.component.html',
  styleUrl: './timeslot-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeslotPickerComponent),
      multi: true
    }
  ]
})
export class TimeslotPickerComponent implements ControlValueAccessor  {
  days: IResourceSchedule[] = [
    {label: 'Mo', dayOfWeek: 1, timeslots: [],},
    {label: 'Tu', dayOfWeek: 2, timeslots: [],},
    {label: 'We', dayOfWeek: 3, timeslots: [],},
    {label: 'Th', dayOfWeek: 4, timeslots: [],},
    {label: 'Fr', dayOfWeek: 5, timeslots: [],},
    {label: 'Sa', dayOfWeek: 6, timeslots: [],},
    {label: 'Su', dayOfWeek: 7, timeslots: [],},
  ];

  selectedDay = this.days[0];

  value: IResourceSchedule[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private nzModalService: NzModalService
  ) {
  }

  openTimeslotModal(day: IResourceSchedule) {
    const modalRef = this.nzModalService.create({
      nzContent: TimeslotModalComponent,
      nzTitle: 'Create a timeslot',
      nzData: {
        currentDay: day
      },
      nzFooter: null,
      nzWidth: '350px'
    });

    modalRef.afterClose.pipe(
      take(1)
    ).subscribe((res: {timeslots: IResourceScheduleTimeslot[]}) => {
      if(!res) {
        return;
      }

      const timeslots: IResourceScheduleTimeslot[] = []

      res?.timeslots?.forEach(item => {
        const {startTime, endTime} = item;

        timeslots.push({
          startTime,
          endTime,
          id: Date.now().toString()
        })
      })

      this.updateTimeslot(day, timeslots)
    })

  }

  updateTimeslot(day: IResourceSchedule, timeslots: IResourceScheduleTimeslot[]) {
    this.days = this.days.map(item => {
      if(item.dayOfWeek === day.dayOfWeek) {
        return {
          ...item,
          timeslots: [...timeslots]
        };
      }
      return item;
    });

    this.onChange(this.days)
  }

  writeValue(value: IResourceSchedule[]): void {
    this.value = value || [];

    this.value?.forEach(day => {
      this.updateTimeslot(day, day.timeslots)
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this method to handle the disabled state
  }
}
