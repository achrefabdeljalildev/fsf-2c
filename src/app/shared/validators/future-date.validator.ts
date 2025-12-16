import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = control.get('startDate')?.value;
        if (!date) {
            return null;
        }

        const selectedDate = new Date(date);
        if (isNaN(selectedDate.getTime())) {
            return { 'invalidDate': true };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return { 'startDateFuture': true };
        }

        return null;
    };
}
