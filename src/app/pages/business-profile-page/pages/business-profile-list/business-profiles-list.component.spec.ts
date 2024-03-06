import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfilesListComponent } from './business-profiles-list.component';

describe('BusinessProfilesComponent', () => {
  let component: BusinessProfilesListComponent;
  let fixture: ComponentFixture<BusinessProfilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProfilesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessProfilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
