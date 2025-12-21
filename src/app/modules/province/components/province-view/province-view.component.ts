import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { ProvinceService } from '../../services/province.service';
import { Province } from '../../models/province.model';

@Component({
    selector: 'app-province-view',
    templateUrl: './province-view.component.html',
    standalone: false,
})
export class ProvinceViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() provinceId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    provinceForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private provinceService: ProvinceService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.provinceId) {
            this.isEditMode = true;
            this.loadProvince(this.provinceId);
        } else if (this.visible && !this.provinceId) {
            this.isEditMode = false;
            this.provinceForm?.reset();
        }
    }

    initForm(): void {
        this.provinceForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadProvince(id: number): void {
        this.isLoading = true;
        this.provinceService.getById(id).subscribe((response) => {
            this.provinceForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.provinceForm.invalid) {
            this.provinceForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const provinceData: Province = this.provinceForm.value;

        const request = this.isEditMode
            ? this.provinceService.update({
                  id: this.provinceId!,
                  ...provinceData,
              })
            : this.provinceService.create(provinceData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode ? 'تم تحديث المحافظة بنجاح' : 'تم إضافة المحافظة بنجاح',
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ المحافظة');
            },
        });

        this.subscriptions.add(subscription);
    }

    cancel(): void {
        this.closeDialog();
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.provinceForm.reset();
        this.provinceId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.provinceId) return;
        this.isLoading = true;
        const subscription = this.provinceService.deleteById(this.provinceId).subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage('تم حذف المحافظة بنجاح');
                this.onSave.emit();
                this.closeDialog();
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حذف المحافظة');
            },
        });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
