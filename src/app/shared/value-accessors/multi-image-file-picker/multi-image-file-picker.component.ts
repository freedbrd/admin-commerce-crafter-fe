import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ZorroModule } from '../../modules/zorro/zorro.module';

@Component({
  selector: 'app-multi-image-file-picker',
  standalone: true,
  imports: [CommonModule, ZorroModule],
  templateUrl: './multi-image-file-picker.component.html',
  styleUrl: './multi-image-file-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiImageFilePickerComponent),
      multi: true
    }
  ]
})
export class MultiImageFilePickerComponent implements ControlValueAccessor {
  @Input() acceptableFileTypes: string | string[] = 'image/jpeg, image/png';

  images: string[] = [];
  
  onChange: any = () => {};
  onTouched: any = () => {};

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  private _value: any = '';

  deleteImage(image: string) {
    this.images = this.images.filter(item => item !== image);

    this.onChange(this.images)
  }

  onFilesSelected(event: Event, fileElement: HTMLInputElement) {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;

    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (true) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
            this.onChange(this.images);
          };
          reader.readAsDataURL(file);
        }
      }
    }

    fileElement.value = null
    
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this method to handle the disabled state
  }

}
