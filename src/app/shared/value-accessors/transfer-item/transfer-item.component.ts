import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-transfer-item',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './transfer-item.component.html',
  styleUrl: './transfer-item.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferItemComponent),
      multi: true
    }
  ]
})
export class TransferItemComponent implements ControlValueAccessor {
  @Input() availableItems: Array<{label: string, value: string}> = []


  selectedItems: Array<{label: string, value: string}> = []

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

  drop(event: CdkDragDrop<Array<{label: string, value: string}>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.onChange(this.selectedItems.map(item => item?.value))
  }

  writeValue(value: string[]): void {
    if (value !== undefined) {
      this.value = value;

      const intersectedValues = this.availableItems.filter(item => value?.some(id => item.value === id)) || [];

      this.selectedItems.push(...intersectedValues);

      // remove intersected from here
      this.availableItems = this.availableItems?.filter(item =>
        !value?.includes(item.value)
      );
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
