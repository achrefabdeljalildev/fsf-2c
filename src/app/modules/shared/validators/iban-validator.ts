import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function ibanSaudiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const iban = control.value.toUpperCase().replace(/\s/g, '');
        if (iban.length !== 24) {
            return { invalidIban: { requiredLength: 24, actualLength: iban.length } };
        }

        if (!iban.startsWith('SA')) {
            return { invalidIban: true };
        }

        const ibanNumbers = iban.slice(2);
        if (!/^\d{22}$/.test(ibanNumbers)) {
            return { invalidIban: true };
        }

        return null;
    };
}
