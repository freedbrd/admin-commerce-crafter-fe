import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotModalComponent } from './timeslot-modal.component';

describe('TimeslotMadalComponent', () => {
  let component: TimeslotModalComponent;
  let fixture: ComponentFixture<TimeslotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeslotModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
