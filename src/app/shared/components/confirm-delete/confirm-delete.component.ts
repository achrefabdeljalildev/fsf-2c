import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    standalone: false,
})
export class ConfirmDeleteComponent {
    @Input() visible: boolean = false;
    @Input() title: string = 'تأكيد الحذف';
    @Input() message: string = 'هل أنت متأكد من حذف هذا العنصر؟';
    @Input() confirmLabel: string = 'حذف';
    @Input() cancelLabel: string = 'إلغاء';
    @Input() isLoading: boolean = false;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onConfirm = new EventEmitter<void>();
    @Output() onCancel = new EventEmitter<void>();

    confirm(): void {
        this.onConfirm.emit();
    }

    cancel(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.onCancel.emit();
    }

    closeDialog(): void {
        this.cancel();
    }
}
