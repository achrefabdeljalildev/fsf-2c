import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'base-form-header',
    templateUrl: './base-form-header.component.html',
    standalone: false,
})
export class BaseFormHeaderComponent {
    @Input() isLoading: boolean = false;
    @Input() isEditMode: boolean = false;
    @Input() isDisabled: boolean = false;

    @Output() submit = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    @Output() remove = new EventEmitter<void>();
}
