import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfilesComponent } from './business-profiles.component';

describe('BusinessProfilesComponent', () => {
  let component: BusinessProfilesComponent;
  let fixture: ComponentFixture<BusinessProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
