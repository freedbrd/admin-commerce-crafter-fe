import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImageFilePickerComponent } from './multi-image-file-picker.component';

describe('MultiImageFilePickerComponent', () => {
  let component: MultiImageFilePickerComponent;
  let fixture: ComponentFixture<MultiImageFilePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiImageFilePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiImageFilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
