import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResourcesComponent } from './profile-resources.component';

describe('BusinessProfileResourcesComponent', () => {
  let component: ProfileResourcesComponent;
  let fixture: ComponentFixture<ProfileResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
