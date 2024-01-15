import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isMatch(fieldNameKey: string, matchFieldNameKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }

    const field = control.get(fieldNameKey);
    const matchField = control.get(matchFieldNameKey);

    if (!field || !matchField) {
      return null;
    }

    if (field.value !== matchField.value) {
      matchField.setErrors({ isMatch: true });
      return { isMatch: true };
    } else {
      matchField.setErrors(null);
      return null;
    }
  };
}
