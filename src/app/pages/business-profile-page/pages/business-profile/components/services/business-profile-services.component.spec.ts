import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileServicesComponent } from './business-profile-services.component';

describe('ServicesComponent', () => {
  let component: BusinessProfileServicesComponent;
  let fixture: ComponentFixture<BusinessProfileServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfileServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessProfileServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
