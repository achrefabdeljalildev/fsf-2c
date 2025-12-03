import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function fileNameValidator(): ValidatorFn {
    const forbiddenCharsRegex = /[\\\/:*?"<>|]/;

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value && forbiddenCharsRegex.test(value)) {
            return { forbiddenChars: true };
        }
        return null;
    };
}
