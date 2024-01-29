import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServicePageComponent } from './profile-service-page.component';

describe('ProfileServicePageComponent', () => {
  let component: ProfileServicePageComponent;
  let fixture: ComponentFixture<ProfileServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileServicePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
