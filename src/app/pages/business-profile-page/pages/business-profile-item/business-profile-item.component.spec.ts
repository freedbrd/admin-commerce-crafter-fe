import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileItemComponent } from './business-profile-item.component';

describe('BusinessProfileComponent', () => {
  let component: BusinessProfileItemComponent;
  let fixture: ComponentFixture<BusinessProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfileItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
