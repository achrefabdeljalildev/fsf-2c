import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationClassification } from '../../models/location-classification.model';
import { LocationClassificationService } from '../../services/location-classification.service';

@Component({
    selector: 'app-location-classification-view',
    templateUrl: './location-classification-view.component.html',
    standalone: false,
})
export class LocationClassificationViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() classificationId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private svc: LocationClassificationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.classificationId) {
            this.isEditMode = true;
            this.load(this.classificationId);
        } else if (this.visible && !this.classificationId) {
            this.isEditMode = false;
            this.form?.reset();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            nameAr: ['', [Validators.required]],
            color: ['#ffffff'],
            descriptionAr: [''],
        });
    }

    load(id: number): void {
        this.isLoading = true;
        this.svc.getById(id).subscribe((res: any) => {
            const data = res?.data || res;
            this.form.patchValue({
                nameAr: data.nameAr,
                color: data.color,
                descriptionAr: data.descriptionAr,
            });
            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const payload: LocationClassification = this.form.value;

        const request = this.isEditMode
            ? this.svc.update({ id: this.classificationId!, ...payload })
            : this.svc.create(payload);

        const sub = request.subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage(this.isEditMode ? 'تم تحديث التصنيف' : 'تم إضافة التصنيف');
                this.onSave.emit();
                this.closeDialog();
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ التصنيف');
            },
        });

        this.subscriptions.add(sub);
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
        this.classificationId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.classificationId) return;
        this.isLoading = true;
        const sub = this.svc.deleteById(this.classificationId).subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage('تم حذف التصنيف بنجاح');
                this.onSave.emit();
                this.closeDialog();
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حذف التصنيف');
            },
        });
        this.subscriptions.add(sub);
    }
}
