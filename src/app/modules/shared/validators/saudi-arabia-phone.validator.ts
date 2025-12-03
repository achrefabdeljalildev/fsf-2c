import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function saudiNationalPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        if (!value) {
            return null;
        }

        const saudiPhoneRegex = /^(05\d{8}|\+9665\d{8}|009665\d{8})$/;

        const isValid = saudiPhoneRegex.test(value);

        return isValid ? null : { saudiNationalPhoneNumber: { value } };
    };
}
