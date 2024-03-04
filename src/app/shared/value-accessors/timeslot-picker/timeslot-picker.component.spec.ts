import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotPickerComponent } from './timeslot-picker.component';

describe('TimeslotPickerComponent', () => {
  let component: TimeslotPickerComponent;
  let fixture: ComponentFixture<TimeslotPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeslotPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeslotPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
