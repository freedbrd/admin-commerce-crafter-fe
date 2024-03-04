import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResourcePageComponent } from './profile-resource-page.component';

describe('ProfileResourcePageComponent', () => {
  let component: ProfileResourcePageComponent;
  let fixture: ComponentFixture<ProfileResourcePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileResourcePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileResourcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
