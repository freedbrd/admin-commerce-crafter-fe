import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileResourcesComponent } from './business-profile-resources.component';

describe('BusinessProfileResourcesComponent', () => {
  let component: BusinessProfileResourcesComponent;
  let fixture: ComponentFixture<BusinessProfileResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfileResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessProfileResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
