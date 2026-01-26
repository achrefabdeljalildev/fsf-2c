import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import HijriDateConfig from '../../util/hijri-date-config';

export type InputType = 'text' | 'number' | 'multiselect' | 'select' | 'checkbox' | 'date' | 'time';

@Component({
    selector: 'app-base-input',
    templateUrl: './base-input.component.html',
    standalone: false,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaseInputComponent),
            multi: true,
        },
    ],
})
export class BaseInputComponent implements ControlValueAccessor {
    @Input() inputType: InputType = 'text';
    @Input() placeholder: string = '';
    @Input() label?: string = '';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() options: any[] = [];
    @Input() optionLabel: string = 'label';
    @Input() optionValue: string = 'value';
    @Input() rows: number = 3;
    @Input() filter: boolean = false;
    @Input() showClear: boolean = false;
    @Input() loading: boolean = false;

    hijriDateConfig: FlatpickrDefaultsInterface = HijriDateConfig;
    value: any;
    onChange: any = () => {};
    onTouched: any = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onValueChange(event: any): void {
        this.value = event;
        this.onChange(this.value);
        this.onTouched();
    }

    onInputChange(event: any): void {
        const inputValue = event.target?.value ?? event;
        this.value = this.inputType === 'number' ? Number(inputValue) : inputValue;
        this.onChange(this.value);
        this.onTouched();
    }

    toggleCheckbox(): void {
        if (!this.disabled) {
            console.log('before: ', this.value);
            switch (this.value) {
                case null:
                case undefined:
                    this.value = true;
                    break;
                case true:
                    this.value = false;
                    break;
                case false:
                    this.value = null;
                    break;
            }

            console.log('after: ', this.value);

            this.onChange(this.value);
            this.onTouched();
        }
    }

    getCheckboxTagStyle(): any {
        return {
            cursor: this.disabled ? 'not-allowed' : 'pointer',
            opacity: this.disabled ? 0.6 : 1,
        };
    }

    onDateValueChange(selectedDates: Date): void {
        this.onValueChange(selectedDates + 'T00:00:00');
    }
}
