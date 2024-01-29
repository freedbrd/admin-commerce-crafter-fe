import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ZorroModule } from '../../modules/zorro/zorro.module';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-image-file-picker',
  standalone: true,
  imports: [CommonModule, ZorroModule],
  templateUrl: './image-file-picker.component.html',
  styleUrl: './image-file-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageFilePickerComponent),
      multi: true
    }
  ]
})
export class ImageFilePickerComponent implements ControlValueAccessor {
  @Input() multiple = false;
  @Input() acceptableFileTypes: string | string[] = 'image/jpeg, image/png';

  image: string = '';

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  private _value: any = '';

  onFilesSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;

    if (!this.multiple) {
      const [firstFile] = Array.from(files);

      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.image = e?.target?.result || '';
        this.onChange(this.image)
      }

      reader.readAsDataURL(firstFile);

      return;
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (true) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            console.log(e.target.result)
            // this.images.push(e.target.result);
            // this.onChange(this.images);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    
  }

  deleteImage() {
    this.image = '';
    this.onChange(this.image)
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
