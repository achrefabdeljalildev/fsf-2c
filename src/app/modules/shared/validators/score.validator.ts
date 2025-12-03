import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function scoreValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const newScore = group.get('newScore')?.value;
        const scoreOfOrigin = group.get('scoreOfOrigin')?.value;

        if (newScore != null && scoreOfOrigin != null && newScore > scoreOfOrigin) {
            return { scoreInvalid: true };
        }
        return null;
    };
}
