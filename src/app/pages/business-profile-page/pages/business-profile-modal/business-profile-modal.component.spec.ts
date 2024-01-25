import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileModalComponent } from './business-profile-modal.component';

describe('BusinessProfileModalComponent', () => {
  let component: BusinessProfileModalComponent;
  let fixture: ComponentFixture<BusinessProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfileModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
