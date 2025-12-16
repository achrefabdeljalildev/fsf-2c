import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';


export function saudiNationalIdNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    if (Validators.required(control) !== null && Validators.required(control) !== undefined) {
      return null;
    }

    const hasCorrectLength = control.value.length === 10;

    const startsWithOne = control.value.charAt(0) === '1';

    const containsOnlyDigits = /^\d+$/.test(control.value);

    const isValid = hasCorrectLength && startsWithOne &&  containsOnlyDigits;

    return isValid ? null : { 'saudiNationalIdNumber': { value: control.value } };

  };
}
