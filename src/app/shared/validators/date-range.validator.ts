import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const startDate = control.get('startDate')?.value;
        const endDate = control.get('endDate')?.value;

        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return { 'endDateBeforeStartDate': true };
        }
        return null;
    };
}
