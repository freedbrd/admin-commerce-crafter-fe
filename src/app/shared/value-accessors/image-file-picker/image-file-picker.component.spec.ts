import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFilePickerComponent } from './image-file-picker.component';

describe('ImageFilePickerComponent', () => {
  let component: ImageFilePickerComponent;
  let fixture: ComponentFixture<ImageFilePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFilePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageFilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
